//exception message
var exMess = "parseDate() exception: ";

//libraries import
var funcLib = "zScriptFunctionLibrary";
eval(LL.getScriptByName(funcLib).getText());

var data = getData();
var param;
var llVars = LL.getVariables();

try{

    for(var i = 0; i < data.length; i++){

        param = data[i].split(secondarySplitter);

        if(param.length < 3){
            llVars.edit()
                .setString(String(param[0]), param[1])
            .commit();
        }
        else{
            if(param[0] == "i"){
                llVars.edit()
                    .setInteger(String(param[1]), parseInt(param[2]))
                .commit();
            }
            else{
                llVars.edit()
                    .setString(String(param[1]), parseInt(param[2]))
                .commit();
            }
        }
    }

}catch(ex) { showToast(String(ex)) }



