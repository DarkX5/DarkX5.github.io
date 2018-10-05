var exMess = "DesktopWorkEndSet() exception: ";
var funcLib = "zScriptFunctionLibrary";
eval(LL.getScriptByName(funcLib).getText());

var data = getData();
var containerId = 114;


var workEndTime = LL.getVariables().getString("WorkEndTime");

try{

var dht = data[0];
var min = data[1];
var res = timerSet(dht, min);

var timeleft = res.hleft +"h "+ res.minleft +"m left";

    var llVars = LL.getVariables();

    llVars.edit()
        .setString("WorkEndTime", res.time)
        .setString("WorkEndTimeLeft", timeleft)
        .setString("WorkEndMinutesLeft", res.tminleft)
        .setString("WorkEndDay", res.day)
        .setInteger("ColorWorkEndMain", defaultColor.mainWorkEnd)
        .setInteger("ColorWorkEndSecondary", defaultColor.secondaryWorkEnd)
        .commit();

    writeFile(pathTaskerLightningVars +"WorkEndTime", res.time);
    writeFile(pathTaskerLightningVars +"WorkEndMinutesLeft", res.tminleft);
    writeFile(pathTaskerLightningVars +"WorkEndDay", res.day);
    writeFile(pathTaskerLightningVars +"WorkEndTimeLeft", timeleft);

}catch(ex){ showToast(exMess + ex); }