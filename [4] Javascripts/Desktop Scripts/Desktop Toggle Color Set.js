//exception message
var exMess = "DesktopToggleSet() exception: ";

//libraries import
var funcLib = "zScriptFunctionLibrary";
eval(LL.getScriptByName(funcLib).getText());

var data = getData();
var param;
var llVars = LL.getVariables();
var iconVar, labelVar;

try{

    for(var i = 0; i < data.length; i++){

        param = data[i].split(secondarySplitter);
        iconVar = String(param[0] + "ToggColor");
        labelVar = String(param[0] + "ToggLabelColor");

        if((!isNullOrEmpty(param[1])) && (( param[1] == "1" ) || (param[1] == "true")))
            llVars.edit()
                .setInteger(iconVar, parseInt(defaultColor.onTogg))
                .setInteger(labelVar, parseInt(defaultColor.onToggLabel))
            .commit();
        else
            llVars.edit()
                .setInteger(iconVar, parseInt(defaultColor.offTogg))
                .setInteger(labelVar, parseInt(defaultColor.offToggLabel))
            .commit();

    }

}catch(ex) { showToast(String(ex)) }



