
//get Next Alarm Object
function getNextAlarmInfo() {

    LL.bindClass("android.provider.Settings");
    var alarm = Settings.System.getString(LL. getContext(). getContentResolver(), Settings.System.NEXT_ALARM_FORMATTED);

    var now = new Date();
    var wds = weekdayArr.shortLower;
    var alarmInfo = new Object();

    var temp;
    var todayleft = 1440 - (now.getHours() * 60) - now.getMinutes();

    if (!isNullOrEmpty(alarm))
    {
        temp = alarm.split(" ");

        alarmInfo.date = null;
        alarmInfo.weekday = temp[0];
        alarmInfo.year = null;
        alarmInfo.month = null;
        alarmInfo.day = null;
        alarmInfo.daysleft = 0;
        alarmInfo.time = temp[1] + " " + temp[2];
        alarmInfo.timeleft = null;
        alarmInfo.hour = temp[1].split(":")[0];
        alarmInfo.hoursleft = 0;
        alarmInfo.minute = temp[1].split(":")[1];
        alarmInfo.minutesleft = 0;
        alarmInfo.tt = temp[2];
    }
    else
    {
        alarmInfo.date = "-- . --- . ----";
        alarmInfo.weekday = "-";
        alarmInfo.year = "----";
        alarmInfo.month = "---";
        alarmInfo.day = "-- . -- . ----";
        alarmInfo.daysleft = "-";
        alarmInfo.time = "-- : --";
        alarmInfo.timeleft = "-- h   -- m";
        alarmInfo.hour = "--"
        alarmInfo.hoursleft = "-";
        alarmInfo.minute = "--";
        alarmInfo.minutesleft = "-";
        alarmInfo.tt = "--";

        return alarmInfo;
    }

    var dleft;
    var diff;

    dleft = wds.indexOf(alarmInfo.weekday.toLowerCase()) - now.getDay();

    if (dleft > 0)
        now.addDays(dleft);
    else 
    if (dleft < 0)
        now.addDays(7 + dleft);

    alarmInfo.date = parseDate(now, "mdy/");
    alarmInfo.year = now.getFullYear();
    alarmInfo.month = now.getMonth();
    alarmInfo.day = now.getDate();
    now = new Date();

    diff = dateDiff(parseDate(alarmInfo.date + " " + alarmInfo.time), now);
    alarmInfo.daysleft = diff.days;
    alarmInfo.hourleft = diff.hours;
    alarmInfo.minutesleft = diff.minutes;
    alarmInfo.timeleft = diff.hours + " h " + String(parseInt(diff.minutes) - (diff.hours * 60)) + " m";


    if (isNullOrEmpty(alarmInfo.tt))
    {
        if (alarmInfo.hour < 10)
            alarmInfo.hour = String("0" + alarmInfo.hour);
        if (alarmInfo.minute < 10)
            alarmInfo.minute = String("0" + alarmInfo.minute);
    }

    if ((alarmInfo.daysleft == 0) && (alarmInfo.minutesleft < todayleft))
        alarmInfo.day = "Today";
    else
    {
        if (alarmInfo.daysleft <= 1)
            alarmInfo.day = "Tomorrow";
        else
            alarmInfo.day = alarmInfo.day + "." + getMonth(alarmInfo.month, "mm") + "." + alarmInfo.year;
    }

    return alarmInfo;

}

//returns battery stats
function getBatteryInfo() {

    LL.bindClass("android.os.BatteryManager");
    LL.bindClass("android.content.BroadcastReceiver");
    LL.bindClass("android.content.Intent");
    LL.bindClass("android.content.IntentFilter");

    var ifilter = new IntentFilter(Intent.ACTION_BATTERY_CHANGED);
    var batteryStatus = LL.getContext().registerReceiver(null, ifilter);

    var batt = new Object();

    batt.status = batteryStatus.getIntExtra(BatteryManager.EXTRA_STATUS, -1);
    batt.level  = batteryStatus.getIntExtra(BatteryManager.EXTRA_LEVEL, -1);
    batt.scale  = batteryStatus.getIntExtra(BatteryManager.EXTRA_SCALE, -1);
    batt.isCharging = batt.status == BatteryManager.BATTERY_STATUS_CHARGING;
    batt.fullCharge = batt.status == BatteryManager.BATTERY_STATUS_FULL;
    batt.chargePlug = batteryStatus.getIntExtra(BatteryManager.EXTRA_PLUGGED, -1);
    batt.usbCharge = batt.chargePlug == BatteryManager.BATTERY_PLUGGED_USB;
    batt.acCharge = batt.chargePlug == BatteryManager.BATTERY_PLUGGED_AC;
    batt.percent = Math.floor((100 * batt.level) / batt.scale);

    return batt;

}



