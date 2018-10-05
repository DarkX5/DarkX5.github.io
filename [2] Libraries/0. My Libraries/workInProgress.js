
//string replaceAll characters
String.prototype.toDate = function (inputFormat = "mdy/ hh:mm:ss") {

    var returnVal, dateVal, timeVal, dateArr, timeArr;
    dateArr = this.split(inputFormat[3]);
    if(inputFormat.length > 4) {
        timeArr = dateArr[dateArr.length - 1].split(inputFormat[4]);
        dateArr[dateArr.length - 1] = timeArr[0];
        timeArr = timeArr[1].split(inputFormat[7]);
    }

    if(inputFormat.indexOf("dmy") > 0)
        dateVal = dateArr[0] +"/"+ dateArr[1] +"/"+ dateArr[2];
    else if(inputFormat.indexOf("dym") > 0)
        dateVal = dateArr[1] +"/"+ dateArr[0] +"/"+ dateArr[2];
    else if(inputFormat.indexOf("mdy") > 0)
        dateVal = dateArr[1] +"/"+ dateArr[0] +"/"+ dateArr[2];
    else if(inputFormat.indexOf("myd") > 0)
        dateVal = dateArr[1] +"/"+ dateArr[0] +"/"+ dateArr[2];
    else if(inputFormat.indexOf("ymd") > 0)
        dateVal = dateArr[1] +"/"+ dateArr[0] +"/"+ dateArr[2];
    else if(inputFormat.indexOf("ydm") > 0)
        dateVal = dateArr[1] +"/"+ dateArr[0] +"/"+ dateArr[2];
    else if(inputFormat.indexOf("dm") > 0)
        dateVal = dateArr[1] +"/"+ dateArr[0] +"/"+ dateArr[2];
    else if(inputFormat.indexOf("dy") > 0)
        dateVal = dateArr[1] +"/"+ dateArr[0] +"/"+ dateArr[2];
    else if(inputFormat.indexOf("md") > 0)
        dateVal = dateArr[1] +"/"+ dateArr[0] +"/"+ dateArr[2];
    else if(inputFormat.indexOf("my") > 0)
        dateVal = dateArr[1] +"/"+ dateArr[0] +"/"+ dateArr[2];
    else if(inputFormat.indexOf("yd") > 0)
        dateVal = dateArr[1] +"/"+ dateArr[0] +"/"+ dateArr[2];
    else if(inputFormat.indexOf("ym") > 0)
        dateVal = dateArr[1] +"/"+ dateArr[0] +"/"+ dateArr[2];
    else if(inputFormat.indexOf("d") > 0)
        dateVal = dateArr[1] +"/"+ dateArr[0] +"/"+ dateArr[2];
    else if(inputFormat.indexOf("m") > 0)
        dateVal = dateArr[1] +"/"+ dateArr[0] +"/"+ dateArr[2];
    else if(inputFormat.indexOf("y") > 0)
        dateVal = dateArr[1] +"/"+ dateArr[0] +"/"+ dateArr[2];

    if(timeArr[0].indexOf("hh") < 0)
        timeVal += "00";
    else if(timeArr[0].indexOf)

    switch(timeArr[0]) {
        case "hh": returnVal += " "+ timeArr[0];
            break;
        //case "mm": returnVal += 
    }

    return new Date(returnVal);
}

