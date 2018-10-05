LL.bindClass("java.io.File");
LL.bindClass("java.io.BufferedReader");
LL.bindClass("java.io.FileReader");
LL.bindClass("java.io.FileWriter");

var exMess = "setTaskerPersistentVars() exception: ";
var funcLib = "zScriptFunctionLibrary";
eval(LL.getScriptByName(funcLib).getText());

var data = getData();
var temp = data[0].split("/");
var intent = new TaskerIntent("setPersistentVar");
var containerId = 115;
var item = null;

function writeFile(filePath, fileContent){

    var file = new File(filePath);
    file.createNewFile();//create the file

    //write content to file
    var f = new FileWriter(file);
    f.write(fileContent);
    f.flush();
    f.close();

}

writeFile(pathTaskerVars + temp[0], temp[1]);

//showToast(temp[0], temp[1]);