var exMess = "DesktopTimeSet() exception: ";
var funcLib = "zScriptFunctionLibrary";
eval(LL.getScriptByName(funcLib).getText());

var containerId = 114;

var now = new Date();
var h = now.getHours();
var m = now.getMinutes();
var t = "AM";

if(h > 12){
    h -= 12;
    t = "PM";
}

if(h == 0)
    h = 12;
else
    if(h < 10)
        h = "0" + h;

if(m < 10)
    m = "0" + m;

try{

    var llVars = LL.getVariables();

    llVars.edit()
        .setString("DesktopTime", h +":"+ m)
        .setString("DesktopTimeTT", t)
        .setInteger("ColorTimeMain", defaultColor.mainTime)
        .setInteger("ColorTimeSecondary", defaultColor.secondaryTime)
        .commit();



}catch(ex){ showToast(exMess + ex); }

