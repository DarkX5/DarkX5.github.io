//import java classes
LL.bindClass("java.io.File");
LL.bindClass("java.io.FileWriter");

var funcLib = "zScriptFunctionLibrary";
eval(LL.getScriptByName(funcLib).getText());

var data = getData();
showToast(String(data[0]));

/*
  llVars = LL.getVariables(); 
  llVars.edit()
  .setBoolean("vSecondaryPanel", true)
  .commit(); 

var dt = new Date();
var a = dt.toDateString("DD MMM yyyy");
alert(a);

//var data = getJSONData();
//showToast(String(data[0]));//data.task[0].par[1] +" | "+ data.task[1].name);

/*
var data = getData();
var containerId = 0;

function writeFile(filePath, text){

    var fw = new FileWriter(new File(filePath));
    fw.write(text);
    fw.close();

}

writeFile("/sdcard/test.txt", "testing");

var s;
showToast(String(s));
//showToast(LL.getVariables().getString("AutoWiFi"));


    
    LL.bindClass("android.provider.Settings");
    var alarm = Settings.System.getString(LL. getContext(). getContentResolver(), Settings.System.NEXT_ALARM_FORMATTED);
showToast(String(alarm));

//var b = getNextAlarmInfo();

//showToast(b.daysleft +" | "+ b.minutesleft);

*/
