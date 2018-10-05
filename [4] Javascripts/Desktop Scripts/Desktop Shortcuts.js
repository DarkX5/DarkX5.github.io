var exMess = "DesktopTimeSet() exception: ";
var funcLib = "zScriptFunctionLibrary";
eval(LL.getScriptByName(funcLib).getText());

var data = getData(); 
var panel = "";
var llVars = LL.getVariables();
var vValues = {};
    vValues.vTime = true;
    vValues.vTimeLeft = false;
    vValues.vDebug = false;
    vValues.vAlarmPanel = true;
    vValues.vMainApps = false;
    vValues.vCommands = false;
    vValues.vShortcutsMenu = true;
    vValues.vShortcutsMain = false;
    vValues.vShortcutsWork = false;
    vValues.vShortcutsSocial = false;
    vValues.vShortcutsOther = false;
    vValues.vShortcutsGames = false;

if(data[0] == "gotoDefaults")
    panel = "Defaults";

switch(data[0]) {

    case "gotoTime": 
        vValues.vTime = true;
        vValues.vTimeLeft = false;
        vValues.vDebug = false;
        panel = "Time";
    break;
    case "gotoTimeLeft":
        vValues.vTime = false;
        vValues.vTimeLeft = true;
        vValues.vDebug = false;
        panel = "Time";
    break;
    case "gotoDebug":
        vValues.vTime = false;
        vValues.vTimeLeft = false;
        vValues.vDebug = true;
        panel = "Time";
    break;

}

switch(data[0]) {

    case "gotoAlarm":
        vValues.vAlarmPanel = true;
        vValues.vMainApps = false;
        vValues.vCommands = false;
        panel = "Alarm";
    break;
    case "gotoMainApps":
        vValues.vAlarmPanel = false;
        vValues.vMainApps = true;
        vValues.vCommands = false;
        panel = "Alarm";
    break;
    case "gotoCommands":
        vValues.vAlarmPanel = false;
        vValues.vMainApps = false;
        vValues.vCommands = true;
        panel = "Alarm";
    break;

}

switch(data[0]) {

    case "gotoShortcutsMenu":
        vValues.vShortcutsMenu = true;
        vValues.vShortcutsMain = false;
        vValues.vShortcutsWork = false;
        vValues.vShortcutsSocial = false;
        vValues.vShortcutsOther = false;
        vValues.vShortcutsGames = false;
        panel = "Shortcuts";
    break;
    case "gotoShortcutsMain":
        vValues.vShortcutsMenu = false;
        vValues.vShortcutsMain = true;
        vValues.vShortcutsWork = false;
        vValues.vShortcutsSocial = false;
        vValues.vShortcutsOther = false;
        vValues.vShortcutsGames = false;
        panel = "Shortcuts";
    break;
    case "gotoShortcutsWork":
        vValues.vShortcutsMenu = false;
        vValues.vShortcutsMain = false;
        vValues.vShortcutsWork = true;
        vValues.vShortcutsSocial = false;
        vValues.vShortcutsOther = false;
        vValues.vShortcutsGames = false;
        panel = "Shortcuts";
    break;
    case "gotoShortcutsSocial":
        vValues.vShortcutsMenu = false;
        vValues.vShortcutsMain = false;
        vValues.vShortcutsWork = false;
        vValues.vShortcutsSocial = true;
        vValues.vShortcutsOther = false;
        vValues.vShortcutsGames = false;
        panel = "Shortcuts";
    break;
    case "gotoShortcutsOther":
        vValues.vShortcutsMenu = false;
        vValues.vShortcutsMain = false;
        vValues.vShortcutsWork = false;
        vValues.vShortcutsSocial = false;
        vValues.vShortcutsOther = true;
        vValues.vShortcutsGames = false;
        panel = "Shortcuts";
    break;
    case "gotoShortcutsGames":
        vValues.vShortcutsMenu = false;
        vValues.vShortcutsMain = false;
        vValues.vShortcutsWork = false;
        vValues.vShortcutsSocial = false;
        vValues.vShortcutsOther = false;
        vValues.vShortcutsGames = true;
        panel = "Shortcuts";
    break;

}

switch(panel) {

    case "Time":
        llVars.edit()
        .setBoolean("vTime", vValues.vTime)
        .setBoolean("vTimeLeft", vValues.vTimeLeft)
        .setBoolean("vDebug", vValues.vDebug)
        .commit(); 
    break;

    case "Alarm":
        llVars.edit()
        .setBoolean("vAlarmPanel", vValues.vAlarmPanel)
        .setBoolean("vMainApps", vValues.vMainApps)
        .setBoolean("vCommands", vValues.vCommands)
        .commit(); 
    break;

    case "Shortcuts":
        llVars.edit()
        .setBoolean("vShortcutsMenu", vValues.vShortcutsMenu)
        .setBoolean("vShortcutsMain", vValues.vShortcutsMain)
        .setBoolean("vShortcutsWork", vValues.vShortcutsWork)
        .setBoolean("vShortcutsSocial", vValues.vShortcutsSocial)
        .setBoolean("vShortcutsOther", vValues.vShortcutsOther)
        .setBoolean("vShortcutsGames", vValues.vShortcutsGames)
        .commit(); 
    break;

    case "Defaults":
        llVars.edit()
        .setBoolean("vTime", vValues.vTime)
        .setBoolean("vTimeLeft", vValues.vTimeLeft)
        .setBoolean("vDebug", vValues.vDebug)
        .setBoolean("vAlarmPanel", vValues.vAlarmPanel)
        .setBoolean("vMainApps", vValues.vMainApps)
        .setBoolean("vCommands", vValues.vCommands)
        .setBoolean("vShortcutsMenu", vValues.vShortcutsMenu)
        .setBoolean("vShortcutsMain", vValues.vShortcutsMain)
        .setBoolean("vShortcutsWork", vValues.vShortcutsWork)
        .setBoolean("vShortcutsSocial", vValues.vShortcutsSocial)
        .setBoolean("vShortcutsOther", vValues.vShortcutsOther)
        .setBoolean("vShortcutsGames", vValues.vShortcutsGames)
        .commit(); 
    break;

}