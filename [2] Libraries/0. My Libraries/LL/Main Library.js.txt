//Default Values

var pathTaskerVars = "/sdcard/0Card/Sync/Other/.TaskerPersistentVars/";
var pathTaskerLightningVars = "/sdcard/0Card/Sync/Other/.TaskerPersistentVars/LightningVars/";
var animationDelay = 500; //time in ms

var defaultColor = new Object();
defaultColor.royalBlue = 0xff2f9ec2;
defaultColor.onTogg = 0xffffffff;
defaultColor.offTogg = 0x202f9ec2;
defaultColor.onToggLabel = 0xffffffff;
defaultColor.offToggLabel = 0x80ffffff;
defaultColor.mainLabel = 0xff2f9ec2;
defaultColor.secondaryLabel = 0xffffffff;
defaultColor.loadingLabel = 0xffff0000;
defaultColor.mainTime = 0xff2f9ec2;
defaultColor.secondaryTime = 0xffffffff;
defaultColor.mainBattery = 0xff2f9ec2;
defaultColor.secondaryBattery = 0xffffffff;
defaultColor.mainAlarm = 0xff2f9ec2;
defaultColor.secondaryAlarm = 0xffffffff;
defaultColor.mainWorkEnd = 0xff2f9ec2;
defaultColor.secondaryWorkEnd = 0xffffffff;
defaultColor.mainCalendar = 0xff2f9ec2;
defaultColor.secondaryCalendar = 0xffffffff;
defaultColor.mainDebug = 0xff2f9ec2;
defaultColor.secondaryDebug = 0xffffffff;

//Functions

//verificare NullOrEmpty 
function isNullOrEmpty(value) {

    var emptyArr = ["undefined", "null", "NaN", ""]
    var emptyObj = ["{}", "[]"];

    if (emptyObj.indexOf(JSON.stringify(value)) > -1) 
        return true; 
    try
    { 
        value = value.replace(/ /g, ""); } 
    catch(ex) { } 
    if (emptyArr.indexOf(String(value)) > -1) 
        return true; 

    return false; 
};


//get Script Data Array
function getData(splitter) {

    var ev = LL.getEvent().getData();

    if (!isNullOrEmpty(ev))
    {
        if (isNullOrEmpty(splitter))
            return ev.split(";");
        else
            return ev.split(String(splitter));
    }
    else
        return null; 

}


//get Item by Name
function getItem(contId, Name) {

    var cont = LL.getContainerById(contId);
    var items = cont.getItems();

    for (var i = items.getLength() - 1; i >= 0; --i)
    {
        var item = items.getAt(i);
        if (item.getName() == Name)
            return item;
    }

}


//set Item Label Color (0xff000000)
function setLabelColor(item, itemLabelColor) {

    var prop = item.getProperties();

    prop.edit()
        .setInteger("s.labelFontColor", itemLabelColor)
        .commit();

}

//send Tasker Intents
function sendTaskerIntents(data) {

    var intent;
    var params;
    var sync = true;

    if (!(data instanceof Array))
        data = data.split(";");

    for (var i = 0; i < data.length; i++)
    {
        if (data[i] == "<sync>")
        {
            sync = true;
            continue;
        }
        else
        if (data[i] == "<async>")
        {
            sync = false;
            continue;
        }
        var par = String(data[i]).split("/");
        intent = new TaskerIntent(par[0]);
        for (var j = 1; j < par.length; j++)
            intent.addParameter(par[j]);

        LL.sendTaskerIntent(intent, sync);

    }

}


//run Scripts
function runScripts(data) {

    var scriptData = null;
    var params;

    if (!(data instanceof Array))
        data = data.split(";");

    for (var i = 0; i < data.length; i++)
    {
        var par = String(data[i]).split("/");
        for (var j = 1; j < par.length; j++)
        {
            if (isNullOrEmpty(scriptData))
                scriptData = par[j];
            else
                scriptData += "/" + par[j];
        }

        LL.runScript(par[0], scriptData);
    }

}

function setVarColor(llVarList, name, value) {

    llVarList.edit()
        .setInteger(name, value)
        .commit();

}

//show Toast
function showToast(toastMessage, toastShortLength) {

    var lengthOk = true;
    if (isNullOrEmpty(toastShortLength) == true)
        lengthOk = false;

    Android.makeNewToast(toastMessage, lengthOk).show();

}

//show Notification
function showNotification(title, text){
    var intent = new TaskerIntent("ShowNotificationByScript");
        intent.addParameter(title);
        intent.addParameter(text);

    LL.sendTaskerIntent(intent, true);
}

