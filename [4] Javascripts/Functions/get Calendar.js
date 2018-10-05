var exMess = "getCalendar() exception: ";
var funcLib = "zScriptFunctionLibrary";
eval(LL.getScriptByName(funcLib).getText());

var data = getData();
var dt = new Date();
var dtformat = data[0];
var sp;
var intent;
var containerId = 115;
var item = null;

var day;
var weekday;
var month;
var year;
var returnFormat;
var evname = "-";
var evdesc = "-";

try{

    sp = dtformat[dtformat.length - 1];
    if((sp == "d") || (sp == "m") || (sp == "y"))
        sp = ".";
    day = dt.getDate();
    if(parseInt(day) < 10)
        day = "0" + day;
    weekday = getWeekDay(dt.getDay(), dtformat);
    month = getMonth(dt.getMonth(), dtformat);
    year = getYear(dt, dtformat);
    
    returnFormat = day +"."+ month +"."+ year;
}
catch(ex){ showToast("get Calendar() exception: " + ex); }


function sendIntent(taskName, wd, d, m, y){

    intent = new TaskerIntent(taskName);

    intent.addParameter(String(weekday));
    intent.addParameter(String(day));
    intent.addParameter(String(month));
    intent.addParameter(String(year));

    LL.sendTaskerIntent(intent, true);

}


if(data.length > 1){
    try{

        sendIntent(data[1], weekday, day, month, year);

    }catch(ex){ showToast("getCalendar() exception: " + ex); }
}
else{

try{

    var llVars = LL.getVariables();

    llVars.edit()
        .setString("DesktopCalDay", weekday)
        .setString("DesktopCalDate", returnFormat)
        .setString("DesktopCalEvent", evname)
        .setString("DesktopCalEventDescription", evdesc)
        .setInteger("ColorCalendarMain", defaultColor.mainCalendar)
        .setInteger("ColorCalendarSecondary", defaultColor.secondaryCalendar)
        .commit();



}catch(ex){ showToast(exMess + ex); }


}