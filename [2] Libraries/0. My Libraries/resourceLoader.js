var r = {};
r.f = {};

/* get the OS Name */
r.f.getOSName = function () {
	if (navigator.appVersion.indexOf("Win") != -1) return "Windows";
	if (navigator.appVersion.indexOf("Mac") != -1) return "MacOS";
	if (navigator.appVersion.indexOf("X11") != -1) return "UNIX";
	if (navigator.appVersion.indexOf("Android") != -1) return "Android";
	else if (navigator.appVersion.indexOf("Linux") != -1) return "Linux";

	return "Unknown OS";
}

/* load scsripts & styles */
r.f.loadResources = function(urlList){
	for (var i = 0; i < urlList.length; i++) {
		if(urlList[i].type == "style") {
			var style = document.createElement("link");
			style.setAttribute("rel", "stylesheet");
			style.setAttribute("type", "text/css");
			style.setAttribute("href", urlList[i].src); 
			document.getElementsByTagName("head")[0].appendChild(style);
		} else {
			var script = document.createElement('script');
			script.src = urlList[i].src;
			script.async = false; // This is required for synchronous execution
			document.head.appendChild(script);
		}
	}
}
/*
r.f.loadScript = function(url, callback){
    var fullUrl = m.path +"/lib/js/"+ url;
    var script = document.createElement("script")
    script.type = "text/javascript";
    script.async = false;
    if (script.readyState){  //IE
        script.onreadystatechange = function(){
            if (script.readyState == "loaded" || script.readyState == "complete"){
                script.onreadystatechange = null;
                callback("Script", fullUrl);
            }
        };
    } else {  //Others
        script.onload = function(){
            callback("Script", fullUrl);
        };
    }

    script.src = fullUrl;
    document.getElementsByTagName("head")[0].appendChild(script);
}

r.f.loadStyle = function(url, callback){
    fullUrl = m.path +"/lib/css/"+ url;
    var element = document.createElement("link");
    element.setAttribute("rel", "stylesheet");
    element.setAttribute("type", "text/css");
    element.setAttribute("href", fullUrl);
    document.getElementsByTagName("head")[0].appendChild(element);
    callback("Style", fullUrl);
}

r.f.loadResource = function(type, url, callback){
    if(type == "script") {
        var script = document.createElement("script")
        script.type = "text/javascript";
        script.async = false;

        if (script.readyState){  //IE
            script.onreadystatechange = function(){
                if (script.readyState == "loaded" || script.readyState == "complete"){
                    script.onreadystatechange = null;
                    callback("Script", url, r.f.loadResourceLog);
                }
            };
        } else {  //Others
            script.onload = function(){
                callback("Script", url, r.f.loadResourceLog);
            };
        }

        script.src = url;
        document.getElementsByTagName("head")[0].appendChild(script);
    } else {
        var element = document.createElement("link");
        element.setAttribute("rel", "stylesheet");
        element.setAttribute("type", "text/css");
        element.setAttribute("href", url); //"external.css");
        document.getElementsByTagName("head")[0].appendChild(element);
        callback("Style", url, r.f.loadResourceLog);
    }
}

r.f.loadResourceLog = function(type, url) {
    console.log(type +" Loaded: ", url);
    // if(callback != null && callback != undefined)
    //     callback();
}
*/


/* v INIT RESOURCE VARS v */

	/* init page vars */
	r.OS = r.f.getOSName();
	r.path = "";
	if (r.OS == 'Android')
		r.path = "/sdcard/0Sync/Work/HTML/Tasker Webviews";
	else
		r.path = ".";

/* ^ INIT RESOURCE VARS ^ */