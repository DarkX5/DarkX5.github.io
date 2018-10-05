var monthArr = {};
monthArr.longLower = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "octomber", "november", "december"];
monthArr.shortLower = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
monthArr.long = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "Octomber", "November", "December"];
monthArr.short = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

var weekdayArr = {};
weekdayArr.longLower = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
weekdayArr.shortLower = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
weekdayArr.long = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
weekdayArr.short = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

var nullArray = [null, undefined, "null", "undefined", ""];


//Prototypes Add-ons

//string replaceAll characters
String.prototype.replaceAll = function(search, replace) { 

    if (isNullOrEmpty(replace))
        return String(this);

    return this.replace(new RegExp('[' + search + ']', 'g'), replace);
}

//add m minutes to date
Date.prototype.addMinutes = function(m) {

    this.setTime(this.getTime() + (m * 60 * 1000)); 
    return this;

}

//add h hour to date
Date.prototype.addHours = function(h) {

    this.setTime(this.getTime() + (h * 60 * 60 * 1000)); 
    return this;

}

//add d days to date
Date.prototype.addDays = function(d) {

    this.setTime(this.getTime() + (d * 24 * 60 * 60 * 1000)); 
    return this;

}


//Functions


//get date difference
function dateDiff(date1, date2) {

    var ds = new Date(date1);
    var de = new Date(date2);
    var diff = ds.getTime() - de.getTime();

    var s = 1000;
    var mi = s * 60;
    var h = mi * 60;
    var d = h * 24;
    var w = d * 7;
    var y = d * 365.25;

    var res = new Object();
    res.seconds = parseInt(diff / s);
    res.minutes = parseInt(diff / mi);
    res.hours = parseInt(diff / h);
    res.days = parseInt(diff / d);
    res.weeks = parseInt(diff / w);
    res.years = parseInt(diff / y);

    res.months = parseInt(y * 12);

    return res;

}

//get absolute date difference
function absDateDiff(date1, date2) {

    var ds = new Date(date1);
    var de = new Date(date2);
    var diff = ds.getTime() - de.getTime();
    if (diff < 0)
        diff *= -1;

    var s = 1000;
    var m = s * 60;
    var h = m * 60;
    var d = h * 24;
    var w = d * 7;
    var y = d * 365.25;

    var res = new Object();
    res.seconds = Math.round(diff / s);
    res.minutes = Math.round(diff / m);
    res.hours = Math.round(diff / h);
    res.days = Math.round(diff / d);
    res.weeks = Math.round(diff / w);
    res.years = Math.round(diff / y);

    res.months = Math.round(y * 12)

    return res;

}

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

//get formatted Year
function getYear(date, yearformat) {

    if (yearformat.indexOf("yy") > -1)
        return String(date.getFullYear());
    else
    {
        if (yearformat.indexOf("y") > -1)
            return String(date.getYear());
        else
            return null;
    }

}

//get formatted Month
function getMonth(mno, monthformat) {

    if (monthformat.indexOf("mmm") > -1)
        return monthArr.long[mno];
    else
    {
        if (monthformat.indexOf("mm") > -1)
            return monthArr.short[mno];
        else
        {
            if (monthformat.indexOf("m") > -1)
                return String(mno);
            else
                return null;
        }
    }

}


//get formatted Weekday
function getWeekDay(wdno, dayformat) {

    if (dayformat.indexOf("ddd") > -1)
        return weekdayArr.long[wdno];
    else
    {
        if (dayformat.indexOf("dd") > -1)
            return weekdayArr.short[wdno];
        else
        {
            if (dayformat.indexOf("d") > -1)
                return String(wdno);
            else
                return null;
        }
    }

}

//set Timer
function timerSet(dth, mi) {

    var result = {};
    var dtNow = new Date();
    var dtNext;

    if (isNullOrEmpty(dth))
    {
        result.date = "-";
        result.time = "-";
    }
    else
    {
        if (!isNullOrEmpty(mi))
        {

            try
            {

                dtNext = dtNow;
                dtNext.addHours(dth);
                dtNext.addMinutes(mi);

                result.date = parseDate(dtNext, "dmy.");
                result.time = parseTime(dtNext, "hhmmt: ");

            }catch(ex){ showToast(exMess + ex); }
        }
        else
            dtNext = new Date(dth);

        try
        {

            var diff = dateDiff(dtNext, dtNow);
            var todayleft = 1440 - (dtNow.getHours() * 60) - dtNow.getMinutes();
            var daysleft = parseInt(diff.minutes / 1440);
            var hleft = diff.hours;
            var minleft = (parseInt(diff.minutes + 1) - (parseInt(diff.hours) * 60));
            var tminleft = diff.minutes;
            var day = "-";

            if ((parseInt(hleft) > -1) && (parseInt(hleft) < 10))
                hleft = "0" + hleft;
            if ((parseInt(minleft) > -1) && (parseInt(minleft) < 10))
                minleft = "0" + minleft;
            if ((parseInt(tminleft) > -1) && (parseInt(tminleft) < 10))
                tminleft = "0" + tminleft;

            if (diff.minutes < todayleft)
                day = "Today";
            else
            {
                if (diff.minutes < todayleft + 1440)
                    day = "Tomorrow";
                else
                    day = dtNext.getDate() + "." + getMonth(dtNext.getMonth(), "mm") + "." + dtNext.getFullYear();
            }

            result.date = parseDate(dtNext, "dmy.");
            result.time = parseTime(dtNext, "hhmmt: ");
            result.hleft = String(hleft);
            result.minleft = String(minleft);
            result.tminleft = String(tminleft);
            result.day = String(day);

        }catch(ex){ showToast(exMess + ex); };
    }
    return result;
}


