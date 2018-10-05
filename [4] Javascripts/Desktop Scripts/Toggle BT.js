LL.bindClass("android.hardware.bluetooth");

var exMess = "ToggleBT() exception: ";
var funcLib = "zScriptFunctionLibrary";
eval(LL.getScriptByName(funcLib).getText());

//showToast(Context.BLUETOOTH_STATE);


runScripts("Desktop Toggle Color Set<p>BT<p>0");
runScripts("Desktop Toggle Color Set<p>BT<p>1");
