var exMess = "TimerSet() exception: ";
var funcLib = "zScriptFunctionLibrary";
eval(LL.getScriptByName(funcLib).getText());

var data = getData();

var taskName = data[0];
var dth = data[1];
var dtm = data[2];

var dtNow = new Date();
var dtNext;


if(!isNullOrEmpty(data[2])){

    try{

        dtNext = new Date();
        dtNext.addHours(dth);
        dtNext.addMinutes(dtm);

    }catch(ex){ showToast(exMess + ex); }
}
else
    dtNext = new Date(dth);


    try{

        var result = timerSet(dth, dtm);
        var intentData = taskName;
        intentData += "<s>"+ result.date;
        intentData += "<s>"+ result.time;
        intentData += "<s>"+ result.hleft;
        intentData += "<s>"+ result.minleft;
        intentData += "<s>"+ result.tminleft;
        intentData += "<s>"+ result.day

/*
        var diff = dateDiff(dtNext, dtNow);
        var todayleft = 1440 - (dtNow.getHours() * 60) - dtNow.getMinutes();
        var daysleft = parseInt(diff.minutes / 1440);
        var hleft = diff.hours;
        var mleft = (parseInt(diff.minutes + 1) - (parseInt(diff.hours) * 60));
        var minleft = diff.minutes;
        var day = "-";
        
        if((parseInt(hleft) > -1) && (parseInt(hleft) < 10))
            hleft = "0"+ hleft;
        if((parseInt(mleft) > -1) && (parseInt(mleft) < 10))
            mleft = "0"+ mleft;
        if((parseInt(minleft) > -1) && (parseInt(minleft) < 10))
            minleft = "0"+ minleft;

        if(diff.minutes < todayleft)
            day = "Today";
        else{
            if(diff.minutes < todayleft + 1440)
                day = "Tomorrow";
            else
                day = dtNext.getDate() + "." + getMonth(dtNext.getMonth(), "mm") + "." + dtNext.getFullYear();
        }

        var intentData = taskName;
        intentData += "/"+ parseDate(dtNext, "dmy.");
        intentData += "/"+ parseTime(dtNext, "hhmmt: ");
        intentData += "/"+ String(hleft);
        intentData += "/"+ String(mleft);
        intentData += "/"+ String(minleft);
        intentData += "/"+ String(day);
*/

        sendTaskerIntents(intentData);

    }catch(ex){ showToast(exMess + ex); };



