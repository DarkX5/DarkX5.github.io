/*

var funcLib = "zScriptFunctionLibrary";
eval(LL.getScriptByName(funcLib).getText());
var exMess = "DesktopColorSet() exception: ";

var data = getData();
var containerId = 115;
llVars = LL.getVariables();

var defaultOk = false;
var customColor = null;

try{          	

    if(data[0].indexOf("default") > -1)
        defaultOk = true;
    else
        if((data[0].indexOf(secondarySplitter) < 0) && (data[0].indexOf("0x") > -1))
            customColor = data[0];
            

    if(defaultOk){

        llVars.edit()
            .setInteger("ColorBatteryMain", defaultColor.mainBattery)
            .setInteger("ColorBatterySecondary", defaultColor.secondaryBattery)
            .setInteger("ColorCalendarMain", defaultColor.mainCalendar)
            .setInteger("ColorCalendarSecondary", defaultColor.secondaryCalendar)
            .setInteger("ColorDebugMain", defaultColor.mainDebug)
            .setInteger("ColorDebugSecondary", defaultColor.secondaryDebug)
            .setInteger("ColorAlarmMain", defaultColor.mainAlarm)
            .setInteger("ColorAlarmSecondary", defaultColor.secondaryAlarm)
            .setInteger("ColorTimeMain", defaultColor.mainTime)
            .setInteger("ColorTimeSecondary", defaultColor.secondaryTime)
            .setInteger("ColorWorkEndMain", defaultColor.mainWorkEnd)
            .setInteger("ColorWorkEndSecondary", defaultColor.secondaryWorkEnd)
            .commit();

    }
    else{
    	    if(isNullOrEmpty(customColor)){
    	    	   var d;             
            for(var i = 1; i < data.length; i++)
            {
                d = data[i].split(secondarySplitter);
                setVarColor(llVars, d[0], d[1]);
            }
        }
        else{
            for(var i = 1; i < data.length; i++)
                setVarColor(llVars, data[i], customColor);
        }
    }

}catch(ex){ showToast(exMess + ex); }

*/