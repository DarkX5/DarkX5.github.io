LL.bindClass("java.io.File"); 
LL.bindClass("java.io.BufferedReader"); 
LL.bindClass("java.io.FileReader"); 
LL.bindClass("java.io.FileWriter"); 

var exMess = "getTaskerPersistenVars() exception: "; 
var funcLib = "zScriptFunctionLibrary"; 
eval(LL.getScriptByName(funcLib).getText()); 

var data = getData(); 
var intent = new TaskerIntent("getPersistentVar"); 
var containerId = 115; 
var item = null; 

function readFile(filePath){

  var file = new File(filePath); 
  var r = new BufferedReader(new FileReader(file)); 
  var s = ""; 
  var l = r.readLine(); 
  while(l != null){
    s += l; 
    l = r.readLine(); 
    if(l != null)
    s += "\n"; 
  }
  return s; 
}

var pVar = readFile(pathTaskerVars + data[0]); 

intent.addParameter(data[0]); 
intent.addParameter(pVar); 

LL.sendTaskerIntent(intent, false); 