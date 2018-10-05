
function parseTime(dt, returnFormat) {

    var parDate; 
    var tempDate, tempTime; 
    var dateOk = false; 
    var h, m, t, sm, st; //sm/st = separator minutes/tt
    var returnVar = "";

    if (dt == "today")
    { 
        parDate = new Date(); 
        dateOk = true; 
    }
    else    if ((dt == null) || (dt == undefined))
        return null; 

    if (dateOk == false)
    { 
        parDate = new Date(dt); 
        if (parDate == "Invalid Date")
        { 
            parDate = String(dt); 
            if (parDate.indexOf("-") >= 0) 
                tempDate = parDate.split("-"); 
            else if (parDate.indexOf(".") >= 0) 
                tempDate = parDate.split("."); 
            else if (parDate.indexOf("/") >= 0) 
                tempDate = parDate.split("/"); 

            parDate = new Date(tempDate[0] + "/" + tempDate[1] + "/" + tempDate[2]); 
            if (parDate == "Invalid Date") 
                parDate = new Date(tempDate[1] + "/" + tempDate[0] + "/" + tempDate[2]); 
            if (parDate == "Invalid Date") 
                parDate = new Date(tempDate[2] + "/" + tempDate[0] + "/" + tempDate[1]); 
            if (parDate == "Invalid Date") 
                parDate = new Date(tempDate[2] + "/" + tempDate[1] + "/" + tempDate[0]); 
        }
    }

    if (parDate == "Invalid Date")
    {
        showToast("Date could not be parsed");
        return null;
    }

    if (isNullOrEmpty(returnFormat))
        returnFormat = "hhmm: "
    sm = returnFormat[returnFormat.length - 2];

    if (returnFormat.indexOf("h") > -1)
    {
        h = parDate.getHours();
        if (returnFormat.indexOf("t") > -1)
        {
            if (h >= 12)
            {
                t = "PM";
                if (h > 12)
                    h -= 12;
            }
            else
                t = "AM";
        }

        if ((returnFormat.indexOf("hh") > -1) && (h < 10))
            h = "0" + h;
    }
    else
    {
        h = "";
        sm = "";
    }

    if (returnFormat.indexOf("m") > -1)
    {
        m = parDate.getMinutes();
        if ((returnFormat.indexOf("mm") > -1) && (m < 10))
            m = "0" + m;
    }
    else
    {
        m = "";
        sm = "";
    }

    if (returnFormat.indexOf("t") > -1)
        st = returnFormat[returnFormat.length - 1];
    else
    {
        t = "";
        st = "";
    }

    if (returnFormat.indexOf("mh") > -1)
        returnVar = String(m + sm + h + st + t);
    else
        returnVar = String(h + sm + m + st + t);

    if (isNullOrEmpty(returnVar))
    {
        showToast("Matching time format not found");
        return null;
    }

    return String(returnVar);

}

//parse given date to returnFormat
function parseDate(dt, returnFormat) {
//returnFormat: any characters can be defined as date/time splitters
//returnFormat: "dmy/" - "25/01/2016"; "dmyy/" - "25/01/16"; 
//returnFormat: "dmy/." - "25/01/2016 07.35"; "dmyy/|" - "25/01/16 07|35"
    var parDate; 
    var tempDate, tempTime; 
    var dateOk = false; 
    var d, dd, mm, yy, shortYear; 
    var returnVar = "";
    var z = 0;

    if (dt == "today")
    { 
        parDate = new Date(); 
        dateOk = true; 
    }
    else    if ((dt == null) || (dt == undefined))
        return null; 

    if (dateOk == false)
    { 
        parDate = new Date(dt); 
        if (parDate == "Invalid Date")
        { 
            parDate = String(dt); 
            if (parDate.indexOf("-") >= 0) 
                tempDate = parDate.split("-"); 
            else if (parDate.indexOf(".") >= 0) 
                tempDate = parDate.split("."); 
            else if (parDate.indexOf("/") >= 0) 
                tempDate = parDate.split("/"); 

            parDate = new Date(tempDate[0] + "/" + tempDate[1] + "/" + tempDate[2]); 
            if (parDate == "Invalid Date") 
                parDate = new Date(tempDate[0] + "/" + tempDate[2] + "/" + tempDate[1]); 
            if (parDate == "Invalid Date") 
                parDate = new Date(tempDate[1] + "/" + tempDate[0] + "/" + tempDate[2]); 
            if (parDate == "Invalid Date") 
                parDate = new Date(tempDate[2] + "/" + tempDate[0] + "/" + tempDate[1]); 
            if (parDate == "Invalid Date") 
                parDate = new Date(tempDate[2] + "/" + tempDate[1] + "/" + tempDate[0]); 
        }
    }

    if ((parDate != null) && (parDate != "Invalid Date") && (parDate != undefined))
    {

        dd = parDate.getDate();
        if (dd < 10) dd = "0" + dd;
        mm = parDate.getMonth() + 1;
        if (mm < 10) mm = "0" + mm;
        yy = parDate.getFullYear();
        h = parDate.getHours();
        m = parDate.getMinutes();

        if (isNullOrEmpty(returnFormat))
        {
            return parDate;
        }

        if (returnFormat.indexOf("yy") >= 0)
        {
            if (returnFormat.length > 5)
                z = 5;
            if (returnFormat.indexOf("dmy") >= 0)
                returnVar = String(dd + returnFormat[4] + mm + returnFormat[4] + (yy % 100)) ;
            if (returnFormat.indexOf("ydm") >= 0)
                returnVar = String((yy % 100) + returnFormat[4] + dd + returnFormat[4] + mm) ;
            if (returnFormat.indexOf("ymd") >= 0)
                returnVar = String((yy % 100) + returnFormat[4] + mm + returnFormat[4] + dd) ;
            if (returnFormat.indexOf("mdy") >= 0)
                returnVar = String(mm + returnFormat[4] + dd + returnFormat[4] + (yy % 100)) ;
            if (returnFormat.indexOf("dyym") >= 0)
                returnVar = String(dd + returnFormat[4] + (yy % 100) + returnFormat[4] + mm) ;
            if (returnFormat.indexOf("myyd") >= 0)
                returnVar = String(mm + returnFormat[4] + (yy % 100) + returnFormat[4] + dd) ;
        }
        else
        {
            if (returnFormat.length > 4)
                z = 4;
            if (returnFormat.indexOf("dmy") >= 0)
                returnVar = String(dd + returnFormat[3] + mm + returnFormat[3] + yy) ;
            if (returnFormat.indexOf("ydm") >= 0)
                returnVar = String(yy + returnFormat[3] + dd + returnFormat[3] + mm) ;
            if (returnFormat.indexOf("ymd") >= 0)
                returnVar = String(yy + returnFormat[3] + mm + returnFormat[3] + dd) ;
            if (returnFormat.indexOf("mdy") >= 0)
                returnVar = String(mm + returnFormat[3] + dd + returnFormat[3] + yy) ;
            if (returnFormat.indexOf("dym") >= 0)
                returnVar = String(dd + returnFormat[3] + yy + returnFormat[3] + mm) ;
            if (returnFormat.indexOf("myd") >= 0)
                returnVar = String(mm + returnFormat[3] + yy + returnFormat[3] + dd) ;
        }
    }
    else
    {
        showToast("Date could not be parsed");
        return null;
    }

    if (isNullOrEmpty(returnVar))
    {
        showToast("Matching date format not found");
        return null;
    }

    if (z > 0)
    {
        returnVar = returnVar + " " + h + returnFormat[z] + m;
    }

    return String(returnVar);
};
