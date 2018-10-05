var exMess = "DesktopFastDebugSet() exception: ";
var funcLib = "zScriptFunctionLibrary";
eval(LL.getScriptByName(funcLib).getText());

var data = getData();
var containerId = 114;

var nearHome;
var nearWork;
var connHome;
var connWork;

try{

    if(isNullOrEmpty(data)){
        nearHome = LL.getVariables().getString("WiFiNearHome");
        nearWork = LL.getVariables().getString("WiFiNearWork");
        connHome = LL.getVariables().getString("WiFiConnectedHome");
        connWork = LL.getVariables().getString("WiFiConnectedWork");
    }
    else{
        nearHome = data[0];
        nearWork = data[1];
        connHome = data[2];
        connWork = data[3];
    }

    var llVars = LL.getVariables();

    llVars.edit()
        .setString("WiFiNearHome", nearHome)
        .setString("WiFiNearWork", nearWork)
        .setString("WiFiConnectedHome", connHome)
        .setString("WiFiConnectedWork", connWork)
        .setInteger("ColorDebugMain", defaultColor.mainDebug)
        .setInteger("ColorDebugSecondary", defaultColor.secondaryDebug)
        .commit();



}catch(ex){ showToast(exMess + ex); }