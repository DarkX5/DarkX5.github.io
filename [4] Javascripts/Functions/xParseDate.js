//exception message
var exMess = "parseDateX() exception: ";

//libraries import
var funcLib = "zScriptFunctionLibrary";
eval(LL.getScriptByName(funcLib).getText());

var data = getData();

parseDateX = function(date, returnFormat, inputFormat){
try{ 
    if(isNullOrEmpty(date))
        return null;
        
    var dt;
    var ret = "";
    var d = "0";
    var m = "0";
    var y = "0";
    var h = "0";
    var mi = "0";
    var t = "0";
    var foundD = false;
    var foundM = false;
    var foundY = false;
    var foundH = false;
    var foundMI = false;
    var foundT = false;
    var sp = "/";
    var temp;
    
    if(date == "today")
        dt = new Date();
    else
        dt = new Date(date);

    if(dt == "Invalid Date"){

        if(typeof(date) == "object"){
            if(isNullOrEmpty(date.day)){
                if(isNullOrEmpty(date[0]))
                    d = "";
                else
                    d = date[0];
                if(isNullOrEmpty(date[1]))
                    m = "";
                else
                    m = date[1];
                if(isNullOrEmpty(date[2]))
                    y = "";
                else
                    y = date[2];
                if(isNullOrEmpty(date[3]))
                    h = "";
                else
                    h = date[3];
                if(isNullOrEmpty(date[4]))
                    mi = "";
                else
                    mi = date[4];
                if(isNullOrEmpty(date[5]))
                    t = "";
                else
                    t = date[5];                
            }
            else{
                if(isNullOrEmpty(date.day))
                    d = "";
                else
                    d = date.day;
                if(isNullOrEmpty(date.month))
                    m = "";
                else
                    m = date.month;
                if(isNullOrEmpty(date.year))
                    y = "";
                else
                    y = date.year;
                if(isNullOrEmpty(date.dateSeparator))
                    h = "";
                else
                    h = date.hour;
                if(isNullOrEmpty(date.datetimeSeparator))
                    mi = "";
                else
                    mi = date.minute;
            }
            
            dt = new Date(m +"/"+ d +"/"+ y + (isNullOrEmpty(h) ? "" : ("T"+ h +":"+ mi)) + (isNullOrEmpty(t) ? "" : (""+ t)));
        }
        else{
            if(typeof(date) == "string"){
                if(date.indexOf("/") > -1)
                    dt = date.split("/");
                else{
                    if(date.indexOf(".") > -1)
                        dt = date.split(".");
                    else{
                        if(date.indexOf("-") > -1)
                            dt = date.split("-");
                    }
                }

                if(dt[0] > 12 && dt[0] < 40){
                    d = dt[0];
                    if(dt[1] > 40){
                        m = dt[2];
                        y = dt[1];
                    }
                    else{
                        m = dt[1];
                        y = dt[2];
                    }
                }
                else{
                    if(dt[1] > 12 && dt[1] < 40){
                        d = dt[1];
                        if(dt[0] > 40){
                            m = dt[2];
                            y = dt[0];
                        }
                        else{
                            m = dt[0];
                            y = dt[2];
                        }
                    }
                    else
                        if(dt[2] > 12 && dt[2] < 40){
                            d = dt[2];
                            if(dt[0] > 40){
                                m = dt[2];
                                y = dt[0];
                            }
                            else{
                                m = dt[0];
                                y = dt[2];
                            }
                        }
                }

                temp = new Date(m +"/"+ d +"/"+ y);
                
                if(temp == "Invalid Date"){
                    temp = new Date(dt[0] + sp + dt[1] + sp + dt[2]);
                    if(temp == "Invalid Date"){
                        temp = new Date(dt[0] + sp + dt[2] + sp + dt[1]);
                        if(temp == "Invalid Date"){
                            temp == new Date(dt[1] + sp + dt[2] + sp + dt[0]);
                            if(temp == "Invalid Date"){
                                temp = new Date(dt[1] + sp + dt[0] + sp + dt[2]);
                                if(temp == "Invalid Date"){
                                    temp = new Date(dt[2] + sp + dt[1] + sp + dt[0]);
                                    if(temp == "Invalid Date"){
                                        temp = new Date(dt[2] + sp + dt[0] + sp + dt[1]);
                                    }
                                }
                            }
                        }
                    }
                }
                
                dt = temp;
            }
        }
    }

    if(dt == "Invalid Date")
        return "Date could not be parsed - " + String(date);

    if(isNullOrEmpty(returnFormat))
        return dt;

    ret = "";

    for(var i = 0; i < returnFormat.length; i++){
        if((returnFormat[i] != "d") 
            && (returnFormat[i] != "m") 
            && (returnFormat[i] != "y") 
            && (returnFormat[i] != "H")
            && (returnFormat[i] != "M")
            && (returnFormat[i] != "T")
            && (returnFormat[i] != "t")){
            
            ret += returnFormat[i];    
        }
        else{
            if((!foundD) && (returnFormat[i] == "d")){
                if((returnFormat[i+1] == "d") && (returnFormat[i+2] == "d")){
                    foundD = true;
                    i += 2;
                        d = dt.getDate();
                        if(d < 10)
                            d = "0" + d;
                }
                else
                    if(returnFormat[i+1] == "d"){
                        foundD = true;
                        i += 1;
                        d = dt.getDate();
                        if(d < 10)
                            d = "0" + d;
                    }
                if(!foundD){
                    foundD = true;
                    d = dt.getDate();
                }
                ret += d;
            }
            else{
                if((!foundM) && (returnFormat[i] == "m")){
                    if((returnFormat[i+1] == "m") && (returnFormat[i+2] == "m")){
                        foundM = true;
                        i += 2;
                            m = dt.getMonth() + 1;
                            if(m < 10)
                                m = "0" + m;
                    }
                    else
                        if(returnFormat[i+1] == "m"){
                            foundM = true;
                            i += 1;
                            m = dt.getMonth() + 1;
                            if(m < 10)
                                m = "0" + m;
                        }
                        
                    if(!foundM){
                        foundM = true;
                        m = dt.getMonth() + 1;
                    }
                    ret += m;
                    
                }
                else{
                    if((!foundY) && (returnFormat[i] == "y")){
                        if((returnFormat[i+1] == "y") && (returnFormat[i+2] == "y")){
                            foundY = true;
                            i += 2;
                                y = dt.getFullYear();
                        }
                        else
                            if(returnFormat[i+1] == "y"){
                                foundY = true;
                                i += 1;
                                y = dt.getFullYear();
                            }
                            
                        if(!foundY){
                            foundY = true;
                            y = dt.getYear();
                        }
                        ret += y;
                    }
                    else{
                        if((!foundH) && (returnFormat[i] == "H")){
                            if((returnFormat[i+1] == "H") && (returnFormat[i+2] == "H")){
                                foundH = true;
                                i += 2;
                                    h = dt.getHours();
                                    if(h < 10)
                                        h = "0" + h;
                            }
                            else
                                if(returnFormat[i+1] == "H"){
                                    foundH = true;
                                    i += 1;
                                    h = dt.getHours();
                                    if(h < 10)
                                        h = "0" + h;
                                }
                            
                            if(!foundH){
                                foundH = true;
                                h = dt.getHours();
                            }
                            
                            ret += h;
                        }
                        else{
                            if((!foundMI) && (returnFormat[i] == "M")){
                                if((returnFormat[i+1] == "M") && (returnFormat[i+2] == "M")){
                                    foundMI = true;
                                    i += 2;
                                        mi = dt.getMinutes();
                                        if(mi < 10)
                                            mi = "0" + mi;
                                }
                                else
                                    if(returnFormat[i+1] == "M"){
                                        foundMI = true;
                                        i += 1;
                                        mi = dt.getMinutes();
                                        if(mi < 10)
                                            mi = "0" + mi;
                                    }
                                    
                                if(!foundMI){
                                    foundMI = true;
                                    mi = dt.getMinutes();
                                }
                                
                                ret += mi;
                            }
                            else{
                                if((!foundT) && (returnFormat[i] == "T")){
                                    if(returnFormat[i+1] == "T"){
                                        foundT = true;
                                        i += 1;
                                        ret += t;
                                    }
                                    else{
                                        if(returnFormat[i] == "t"){
                                            if(returnFormat[i+1] == "t"){
                                                foundT = true;
                                                i += 1;
                                                ret += t;
                                            }
                                            else
                                                ret += returnFormat[i];
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    
    return String(ret);
}catch(ex){ return String(ex); }
}

try{

    //var a = new Date("06/23/1987");
    //showToast(a);

    showToast(parseDateX(data[0], data[1]));

}catch(ex){ showToast(exMess + String(ex)) }





