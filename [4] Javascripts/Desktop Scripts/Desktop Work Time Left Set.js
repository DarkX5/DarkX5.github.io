var exMess = "DesktopWorkTimeLeftSet() exception: ";
var funcLib = "zScriptFunctionLibrary";
eval(LL.getScriptByName(funcLib).getText());

var data = getData();
var containerId = 114;


var workEndTime = LL.getVariables().getString("WorkEndTime");
var time = "";
var timeleft = "";
var minleft = "";
var day = "";

try{

    var now = new Date();
    var workEnd;

    if(workEndTime.indexOf("-") > -1){
        workEnd = now;
        workEnd.addHours(9);

        workEndTime = workEnd.getHours() +" : "+ workEnd.getMinutes() + (workEnd.getHours() > 12 ? " PM" : " AM");

        var b = dateDiff(workEnd, now);

        time = workEndTime;
        timeleft = b.hours +" h "+ (b.minutes - b.hours * 60) +" m";
        minleft = b.minutes;
        day = weekdayArr.long[(new Date()).getDay()];
    }
    else{

        workEnd = parseDate(String(now.getMonth() + 1) +"/"+ now.getDate() +"/"+ now.getFullYear() +" "+ workEndTime);
//showToast(workEnd);
        workEndTime = (workEnd.getHours() > 12? workEnd.getHours() - 12:workEnd.getHours()) +" : "+ workEnd.getMinutes() + (workEnd.getHours() > 12 ? " PM" : " AM");

        var b = dateDiff(workEnd, now);

        time = workEndTime;
        timeleft = b.hours +" h "+ (b.minutes - b.hours * 60) +" m";
        minleft = b.minutes;
        day = weekdayArr.long[(new Date()).getDay()];
    }

    var llVars = LL.getVariables();

    llVars.edit()
        .setString("WorkEndTime", time)
        .setString("WorkEndTimeLeft", timeleft)
        .setString("WorkEndMinutesLeft", minleft)
        .setString("WorkEndDay", day)
        .setInteger("ColorWorkEndMain", defaultColor.mainWorkEnd)
        .setInteger("ColorWorkEndSecondary", defaultColor.secondaryWorkEnd)
        .commit();

    if(workEndTime.indexOf("-") > -1)
        writeFile(pathTaskerLightningVars +"WorkEndTime", time);
    writeFile(pathTaskerLightningVars +"WorkEndTimeLeft", timeleft);

}catch(ex){ showToast(exMess + ex); }

/*

var exMess = "DesktopWorkTimeLeftSet() exception: ";
var funcLib = "zScriptFunctionLibrary";
eval(LL.getScriptByName(funcLib).getText());

var data = getData();
var containerId = 114;


var workEndTime = LL.getVariables().getString("WorkEndTime");
var time;
var timeleft;
var minleft;
var day;

try{

    if(isNullOrEmpty(data[0])){
        var now = new Date();
        var workEnd;
        if(workEndTime.indexOf("-") > -1){
            workEnd = now;
            workEnd.addHours(9);
        }
        else
            workEnd = parseDate(String(now.getMonth() + 1) +"/"+ now.getDate() +"/"+ now.getFullYear() +" "+ workEndTime);

        workEndTime = workEnd.getHours() +" : "+ workEnd.getMinutes() + (workEnd.getHours() > 12 ? " PM" : " AM");

        var b = dateDiff(workEnd, now);

        time = workEndTime;
        timeleft = b.hours +" h "+ (b.minutes - b.hours * 60) +" m";
        minleft = b.minutes;
        day = weekdayArr.long[(new Date()).getDay()];
    }
    else{
        time = data[0];
        timeleft = data[1];
        minleft = data[2];
        day = data[3];
    }

    var llVars = LL.getVariables();

    llVars.edit()
        .setString("WorkEndTime", time)
        .setString("WorkEndTimeLeft", timeleft)
        .setString("WorkEndMinutesLeft", minleft)
        .setString("WorkEndDay", day)
        .setInteger("ColorWorkEndMain", defaultColor.mainWorkEnd)
        .setInteger("ColorWorkEndSecondary", defaultColor.secondaryWorkEnd)
        .commit();

    writeFile(pathTaskerLightningVars +"WorkEndTime", time);
    writeFile(pathTaskerLightningVars +"WorkEndTimeLeft", timeleft);

}catch(ex){ showToast(exMess + ex); }

*/