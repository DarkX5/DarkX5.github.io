var exMess = "RunTasks() exception: ";
var funcLib = "zScriptFunctionLibrary";
eval(LL.getScriptByName(funcLib).getText());

var data = getData();
var sync;

sendTaskerIntents(data);
