var exMess = "DesktopCalendarSet() exception: ";
var funcLib = "zScriptFunctionLibrary";
eval(LL.getScriptByName(funcLib).getText());

var data = getData();

var containerId = 115;
var item = null;
var evname = "-";
var evdesc = "-";

if(!isNullOrEmpty(data[2]))
    evname = data[2];
if(!isNullOrEmpty(data[3]))
    evdesc = data[3];


try{

    var llVars = LL.getVariables();

    llVars.edit()
        .setString("DesktopCalDay", data[0])
        .setString("DesktopCalDate", data[1])
        .setString("DesktopCalEvent", evname)
        .setString("DesktopCalEventDescription", evdesc)
        .setInteger("ColorCalendarMain", defaultColor.mainCalendar)
        .setInteger("ColorCalendarSecondary", defaultColor.secondaryCalendar)
        .commit();



}catch(ex){ showToast(exMess + ex); }
