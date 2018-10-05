var exMess = "getWiFiInfoParse() exception: ";
var funcLib = "zScriptFunctionLibrary";
eval(LL.getScriptByName(funcLib).getText());

var data = getData();
var intent = new TaskerIntent("LL WiFi Info Parse Set");

var ok = true;
var winfo = data[0];
var wnearhome = 0;
var wnearwork = 0;
var wconnectedhome = 0;
var wconnectedwork = 0;
var wconnected = 0;


function findInArray(type, arrayVar, ssidVar, macVar){

	   var sId = ssidVar.split("/");
	   var mc = macVar.split("/");
	   var sFound = false;
	   var mFound = false;

    for(var i = 0; (i < sId.length) && (sFound == false); i++){
        if(arrayVar.indexOf(sId[i]) > -1)
            sFound = true;
    }

    for(var i = 0; (i < mc.length) && (mFound == false); i++){
        if(arrayVar.indexOf(mc[i]) > -1)
            mFound = true;
    }
    
    if((type == "home") || (type == "mainwork")){
        if((sFound == true) || (mFound == true))
            return true;
    }
    else{
        if((sFound == true) || (mFound == true))
            return true;
    }

    return false;

}

if((winfo == null) || (winfo == undefined))
    ok = false;

if((ok) && (winfo.indexOf("CONNECTION") > -1))
    wconnected = 1;

if((ok) && (findInArray("work", winfo, "Softelligence_Guest/Softelligence_Guest-5/Softelligence_Internal-2/Softelligence_Internal-5", "00:90:4c:5f:00:2a/78:24:af:99:17:b4/c4:12:f5:a7:59:c0/c4:12:f5:a7:59:c8") == true)){
    wnearwork = 1;
    if(winfo.indexOf("CONNECTION") > -1)
        wconnectedwork = 1;
    ok = false;
}

if((ok) && (findInArray("home", winfo, "Pim & Patricia/Dark Space (2.4GHz)/Dark Space (5GHz)/RomTelecom-WEP-738F/RomTelecom-WPA-738F", "04:8d:38:c2:d5:59/c4:6e:1f:ec:f9:b4/c4:6e:1f:ec:f9:b5/82:f3:a3:4d:73:8c/82:f3:a3:4d:73:8d") == true)){
    wnearhome = 1;
    if(winfo.indexOf("CONNECTION") > -1)
        wconnectedhome = 1;
    ok = false;
}

if(ok)
    ret = false;
else
    ret = true	;

intent.addParameter(wnearhome);
intent.addParameter(wnearwork);
intent.addParameter(wconnectedhome);
intent.addParameter(wconnectedwork);
intent.addParameter(wconnected);
intent.addParameter(ret);

LL.sendTaskerIntent(intent, false);

