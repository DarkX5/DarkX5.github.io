var exMess = "NextAlarmSet() exception: ";
var funcLib = "zScriptFunctionLibrary";
eval(LL.getScriptByName(funcLib).getText());

var data = getData();
var containerId = 115;
var item = null;

var date;
var time;
var timeleft;
var minleft;
var day;

var nowDT;
var alarmDT;

try{

    if(isNullOrEmpty(data)){
        var b = getNextAlarmInfo();
        time = b.hour +" : "+ b.minute +" "+ b.tt;
        day = b.day;
        timeleft = b.timeleft;
        minleft = b.minutesleft;
    }
    else{
        date = data[0];
        time = data[1];
        timeleft = String(data[2]);
        day = String(data[3]);
        nowDT = new Date();
        alarmDT = new Date(date.replace("-","/") +" "+ time);
    }

    var llVars = LL.getVariables();

    llVars.edit()
        .setString("NextAlarmTime", time)
        .setString("NextAlarmDay", day)
        .setString("NextAlarmTimeLeft", timeleft)
        .setString("NextAlarmMinLeft", minleft)
        .setInteger("ColorAlarmMain", defaultColor.mainAlarm)
        .setInteger("ColorAlarmSecondary", defaultColor.secondaryAlarm)
        .commit();

//set Tasker Vars
    var taskList = [];
    var pSplit = secondarySplitter;
    var temp = "setVarValue" + pSplit;
        temp += "NextAlarmTime" + pSplit;
        temp += String(time) + pSplit;
    taskList.push(temp);
        temp = "setVarValue" + pSplit;
        temp += "NextAlarmTimeLeft" + pSplit;
        temp += String(timeleft) + pSplit;
    taskList.push(temp);

    sendTaskerIntents(taskList);
//    writeFile(pathTaskerLightningVars +"NextAlarmTime", time);
//    writeFile(pathTaskerLightningVars +"NextAlarmTimeLeft", timeleft);

}catch(ex){ showToast(exMess + ex); }

