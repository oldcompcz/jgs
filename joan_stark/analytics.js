var startTime = new Date();

var archive_analytics = {
  values: {},


  // 2nd param: [optional] callback to invoke once ping to analytics server is done
  // 3rd param: [optional] logical truthy -- set to true/1 to add some archive.org site-specific values
  send_ping: function(values, onload_callback, augment_for_ao_site) {
    var img_src = "//analytics.archive.org/0.gif";

    var format_ping = function(values) {
      var ret = [];
      var count = 2;
      var version = 2;

      for (var data in values) {
        ret.push(encodeURIComponent(data) + "=" + encodeURIComponent(values[data]));
        count = count + 1;
      }

      ret.push('version=' + version);
      ret.push('count=' + count);
      return ret.join("&");
    };


    if (augment_for_ao_site  &&  !values['service'])
      values['service'] = 'ao_2';

    var string = format_ping(values);

    var loadtime_img = new Image(100,25);
    if (onload_callback  &&  typeof(onload_callback)=='function')
      loadtime_img.onload = onload_callback;
    loadtime_img.src = img_src + "?" + string;
  },
send_scroll_fetch_event: function(page) {
  var endTime = new Date();
  archive_analytics.send_ping({
    'service':'ao_2',
    'kind':'event',
    'ec':'page_action',
    'ea':'scroll_fetch',
    'el':location.pathname,
    'ev':page,//int
    'loadtime':(endTime.getTime() - startTime.getTime()),
    'cache_bust':Math.random()
  });
},
send_scroll_fetch_base_event: function() {
  var endTime = new Date();
  archive_analytics.send_ping({
    'service':'ao_2',
    'kind':'event',
    'ec':'page_action',
    'ea':'scroll_fetch_base',
    'el':location.pathname,
    'loadtime':(endTime.getTime() - startTime.getTime()),
    'cache_bust':Math.random()
  });
},
  _onload_func: function() {//logically private

    var get_locale = function() {
      if (navigator) {
        if (navigator.language)
          return navigator.language;

        else if (navigator.browserLanguage)
          return navigator.browserLanguage;

        else if (navigator.systemLanguage)
          return navigator.systemLanguage;

        else if (navigator.userLanguage)
          return navigator.userLanguage;
      }
      return '';
    };


    var endTime = new Date();

    // Set field values
    archive_analytics.values['kind'     ] = 'pageview';
    archive_analytics.values['loadtime' ] = endTime.getTime() - startTime.getTime();
    archive_analytics.values['timediff' ] = (new Date().getTimezoneOffset()/60)*(-1); // *timezone* diff from UTC
    archive_analytics.values['locale'   ] = get_locale();
    archive_analytics.values['referrer' ] = (document.referrer == '' ? '-' : document.referrer);

    archive_analytics.send_ping(archive_analytics.values);
  }
};

archive_analytics.get_data_packets = function () {
  return [archive_analytics.values];
};

if (window.addEventListener) {
  window.addEventListener('load', archive_analytics._onload_func, false);
} else if (window.attachEvent) {
  window.attachEvent('onload', archive_analytics._onload_func);
}
