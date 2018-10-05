var funcLib = "zScriptFunctionLibrary"; 
eval(LL.getScriptByName(funcLib).getText()); 
var exMess = "DesktopBatterySet() exception: "; 

var data = getData(); 
var containerId = 115; 

var b; 
var batteryLevel; 
var batteryColor = 0xaf2f9ec2; //default color (royal blue)
var isCharging; 
var chargeComplete; 


try{

  if(isNullOrEmpty(data)){

    b = getBatteryInfo(); 
    batteryLevel = b.level; 
    isCharging = b.isCharging; 
    chargeComplete = b.fullCharge; 

  }
  else{

    batteryLevel = data[0]; 
    isCharging = data[1]; 
    chargeComplete = data[2]; 

  }

  if(isCharging == 1){

    if(isCharging == 1)
    batteryColor = 0xff0000ff; //blue
    //if(chargeComplete == 1)
    //batteryColor = 0xff00ff00; //green

  }
  else{

    if((parseInt(batteryLevel) > 25) && (parseInt(batteryLevel) <= 35))
        batteryColor = 0xafffff00; //yellow
    if(parseInt(batteryLevel) <= 25)
        batteryColor = 0xffff0000; //red
  }


  llVars = LL.getVariables(); 
  llVars.edit()
  .setString("Batt", batteryLevel + "%")
  .setInteger("ColorBatteryMain", batteryColor)
  .setInteger("ColorBatterySecondary", defaultColor.secondaryBattery)
  .commit(); 

}catch(ex){showToast(exMess + ex); }