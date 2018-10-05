/* Variables */
var utilsData = {
    monthNames: {
        EN: {
            short: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            long: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "Octomber", "November", "December"]
        }
    },
    dayNames: {
        EN: {
            short: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            long: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
        }
    },
    nullArray: [null, undefined, "null", "undefined", ""]
};



/* Prototypes */

/* string replaceAll characters */
String.prototype.replaceAll = function (search, replace) {

    if (isNullOrEmpty(replace))
        return String(this);

    return this.replace(new RegExp('[' + search + ']', 'g'), replace);
}

/* add m minutes to date */
Date.prototype.addMinutes = function (value) {

    this.setTime(this.getTime() + (value * 60 * 1000));
    return this;

}

/* add h hour to date */
Date.prototype.addHours = function (value) {

    this.setTime(this.getTime() + (value * 60 * 60 * 1000));
    return this;

}

/* add d days to date */
Date.prototype.addDays = function (value) {

    this.setTime(this.getTime() + (value * 24 * 60 * 60 * 1000));
    return this;

}

/* get formatted Year */
Date.prototype.Year = function (yearFormat = "yy") {
    if (yearFormat.indexOf("yy") > -1)
        return String(this.getFullYear());
    else {
        if (yearFormat.indexOf("y") > -1)
            return String(this.getYear());
        else
            return null;
    }
}

/* get formatted Month */
Date.prototype.Month = function (monthFormat = "mm", language = "EN") {
    if (monthFormat.indexOf("mmm") > -1)
        return utilsData.monthNames[language].long[this.getMonth()];
    else {
        if (monthFormat.indexOf("mm") > -1)
            return utilsData.monthNames[language].short[this.getMonth()];
        else {
            if (monthFormat.indexOf("m") > -1)
                return String(this.getMonth());
            else
                return null;
        }
    }
}

/* get formatted Weekday */
Date.prototype.WeekDay = function (dayFormat = "dd", language = "EN") {
    if (dayFormat.indexOf("ddd") > -1)
        return utilsData.dayNames[language].long[this.getDay()];
    else {
        if (dayFormat.indexOf("dd") > -1)
            return utilsData.dayNames[language].short[this.getDay()];
        else {
            if (dayFormat.indexOf("d") > -1)
                return String(this.getDay());
            else
                return null;
        }
    }
}



/* Functions */

/* verificare NullOrEmpty  */
function isNullOrEmpty(value) {

    var emptyArr = ["undefined", "null", "NaN", ""]
    var emptyObj = ["{}", "[]"];

    if (emptyObj.indexOf(JSON.stringify(value)) > -1)
        return true;
    try {
        value = value.replace(/ /g, "");
    } catch (ex) {}
    if (emptyArr.indexOf(String(value)) > -1)
        return true;

    return false;
};

/* get date difference */
function dateDiff(dateStart, dateEnd) {

    var ds = new Date(dateStart);
    var de = new Date(dateEnd);
    var diff = ds.getTime() - de.getTime();

    var s = 1000;
    var m = s * 60;
    var h = m * 60;
    var d = h * 24;
    var w = d * 7;
    var y = d * 365.25;

    var res = new Object();
    res.seconds = diff / s; /*  parseInt(diff / s); */
    res.minutes = diff / m; /*  parseInt(diff / m); */
    res.hours = diff / h; /*  parseInt(diff / h); */
    res.days = diff / d; /*  parseInt(diff / d); */
    res.weeks = diff / w; /*  parseInt(diff / w); */

    res.months = y * 12; /*  parseInt(y * 12); */
    res.years = diff / y; /*  parseInt(diff / y); */

    return res;

}

/* get absolute date difference */
function absDateDiff(dateStart, dateEnd) {

    var ds = new Date(dateStart);
    var de = new Date(dateEnd);
    var diff = ds.getTime() - de.getTime();
    if (diff < 0)
        diff *= -1;

    var s = 1000;
    var m = s * 60;
    var h = m * 60;
    var d = h * 24;
    var w = d * 7;
    var y = d * 365.25;

    var res = {};
    res.seconds = diff / s; /*  Math.round(diff / s); */
    res.minutes = diff / m; /*  Math.round(diff / m); */
    res.hours = diff / h; /*  Math.round(diff / h); */
    res.days = diff / d; /*  Math.round(diff / d); */
    res.weeks = diff / w; /*  Math.round(diff / w); */

    res.months = y * 12; /*  Math.round(y * 12) */
    res.years = diff / y; /*  Math.round(diff / y); */

    return res;

}
