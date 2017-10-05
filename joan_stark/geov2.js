var ycsdone;
function geovisit()
{
  var z;
  if (ycsdone)
    return;
  z="&r="+escape(document.referrer);
  z=z+"&b="+escape(navigator.appName+" "+navigator.appVersion);
  w=parseFloat(navigator.appVersion);
  if (w > 2.0) {
    z=z+"&s="+screen.width+"x"+screen.height;
    z=z+"&o="+navigator.platform;
    v="1.2";
    if (navigator.appName != "Netscape") {
      z=z+"&c="+screen.colorDepth;
    } else {
      z=z+"&c="+screen.pixelDepth
    }
    z=z+"&j="+navigator.javaEnabled();
  } else {
    v=1.0;
  }
  z=z+"&v="+v;
  document.writeln("<IMG BORDER=0 SRC=\"../../../visit.geocities.com/visitd41d.gif?"+z+"\">");
  ycsdone=1;
}
