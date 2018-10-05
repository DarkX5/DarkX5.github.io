// Royal Blue:  #2f9ec2 / rgba(47, 158, 194, 1);

//verificare NullOrEmpty
function isNullOrEmpty (value, fallbackValue) {
	var isNull = false;
	var emptyArr = ["undefined", "null", "NaN", ""];
	var	emptyObj = ["{}", "[]"];
	if (emptyObj.indexOf(JSON.stringify(value)) > -1) {
		if(isNullOrEmpty(value.style))
			isNull = true;
	}
	try {
		value = value.replace(/ /g, "");
	} catch (ex) { }
	if (emptyArr.indexOf(String(value)) > -1) {
		isNull = true;
	}

	if (fallbackValue !== undefined && fallbackValue !== null) {
		if(isNull === true)
			return fallbackValue;
		else
			return value;
	}
	
	return isNull;
};

//verificare isNull - optimizata pentru cand nu conteaza daca e obiectul e gol
function isNull (value) {
	var emptyArr = ["undefined", "null"]

	if (emptyArr.indexOf(String(value)) > -1)
		return true;

	return false;
};

//verificare isEmpty - optimizata pentru cand esti deja sigur ca obiectul nu e gol
function isEmpty (value) {
	var emptyArr = ["NaN", ""];
	var	emptyObj = ["{}", "[]"];
	if (emptyObj.indexOf(JSON.stringify(value)) > -1)
		if(isEmpty(value.style))
			return true;

	try { value = value.replace(/ /g, ""); } catch (ex) { }
	if (emptyArr.indexOf(String(value)) > -1)
		return true;

	return false;
};

//parse boolean function - convert Bool/Number/String/Array to Boolean
function  parseBool (value) {
	//negative numbers return false
	if (!isNullOrEmpty(value)) {
		switch (Object.prototype.toString.call(value)) {
			case "[object Boolean]": return value;
			case "[object Number]": return ( value > 0 ? true : false );
			case "[object String]":
				var checkedVal = String(value).toLowerCase();
				switch (value.toLowerCase().trim()) {
					case "true": case "yes": case "on": case "1": return true;
					default: return false;
				}
			case "[object Array]":
				var resultArr = [];
				for(var i = 0; i < value.length; i += 1) {
					resultArr.push(parseBool(value[i]));
				}
				return resultArr;
				break;
			default: return "Invalid Value";
		}
	}
	return false;
}

//toggle visibility for element(s) 
function toggleVisibility(elements, hideClass, visibilityValue) {
	debugger;
	if(!isNull(elements)) {
		var obj = elements;
		var objType = Object.prototype.toString.call(elements);
		if (objType === "[object Array]" || objType === "[object HTMLCollection]")
			obj = elements;
		else {
			obj = [];
			for(var i = 0; i < elements.length; i += 1)
				obj.push(isNullOrEmpty(elements[i], elements));
		}

		if(isNullOrEmpty(hideClass)) {
			if(!isNullOrEmpty(visibilityValue)) {
				var visibility = (visibilityValue === true ? "" : "none") 
				for(var i = 0; i < obj.length; i += 1)
					obj[i].style.display = visibility;
			} else {
				for(var i = 0; i < obj.length; i += 1) {
					if(obj[i].style.display === "none")
						obj[i].style.display = "";
					else
						obj[i].style.display = "none";
				}							
			}
		} else {
			if(!isNullOrEmpty(visibilityValue)) {
				var visibility = (visibilityValue === true ? "" : hideClass);
				if(visibility === "") {
					for(var i = 0; i < obj.length; i += 1)
						obj[i].className = replaceAll(obj[i].className, " "+ hideClass, "");
				} else {
					for(var i = 0; i < obj.length; i += 1)
						obj[i].className += " "+ hideClass;
				}
			} else {
				for(var i = 0; i < obj.length; i += 1) {
					if(obj[i].className.indexOf(hideClass) > -1)
						obj[i].className = replaceAll(obj[i].className, " "+ hideClass, "");
					else
						obj[i].className += " "+ hideClass;
				}							
			}
		}
	} else {
		console.log("toggleVisibility: elements is empty");
	}
}
/*
//string replace all characters
function replaceAll (target, search, replace) {
	//string replace ALL occurrences
	if(isNullOrEmpty(replace))
			replace = "";

	return target.replace(new RegExp(search, 'g'), replace);
}
*/
//string replaceAll characters
function replaceAll (target, search, replace) {
	if(isNullOrEmpty(target)) {
		console.log("replaceAll error: target is null or empty");
		return null;
	}
	//string replace ALL occurrences
	if(isNullOrEmpty(replace))
			replace = "";

	var returnVar = target;
	var foundOk = true;
	while(foundOk) {
		returnVar = returnVar.replace(search, replace);
		if(returnVar.indexOf(search) < 0)
			foundOk = false;
	}

	return returnVar;
}

//get the OS Name
function getOSName () {
	if (navigator.appVersion.indexOf("Win") != -1) return "Windows";
	if (navigator.appVersion.indexOf("Mac") != -1) return "MacOS";
	if (navigator.appVersion.indexOf("X11") != -1) return "UNIX";
	if (navigator.appVersion.indexOf("Android") != -1) return "Android";
	else if (navigator.appVersion.indexOf("Linux") != -1) return "Linux";

	return "Unknown OS";
}

//GET Local Storage Variable
function getLS (varName) {
	if(isNullOrEmpty(varName)) {
		console.log('Error "getLS()" - Invalid variable name');
		return varName;
	}
	// Get Item from LocalStorage or highScore === 0
	var returnVar = localStorage.getItem(varName);
	
	// Set a default value for the item
	if(isNullOrEmpty(returnVar))
		returnVar = "{}";
	
	// Return the high score
	return JSON.parse(returnVar);
}

//SET Local Storage Variable
function setLS(varName, newVal) {

	if(isNullOrEmpty(varName)) {
		console.log('Error "setLS()" - Invalid variable name');
		return varName;
	}
	
	if(isNullOrEmpty(newVal))
		newVal = {};
		
	localStorage.setItem(varName, JSON.stringify(newVal) );
}

function downloadFile(fileName, fileData, fileType) {
	if(isNullOrEmpty(fileName)) {
		console.warn("downloadFile(): fileName cannot be null");
		return false;
	}
	
	var fName = fileName.split(".");
	var fExt = fileName.length > 1 ? fileName[1] : "txt";
	var fType = isNullOrEmpty(fileType) ? "text/plain" : fileType;
	fName = fName[0];
	
	var elem = document.createElement('a');
	elem.setAttribute('href', 'data:'+ fType +';charset=utf-8,' + encodeURIComponent(String(fileData)));
	elem.setAttribute('download', fName +"."+ fExt);
	
	if (document.createEvent) {
		var event = document.createEvent('MouseEvents');
		event.initEvent('click', true, true);
		elem.dispatchEvent(event);
	} else {
		elem.click();
	}
}


/* v PROTOTYPES v */


//parse boolean function - convert Bool/Number/String/Array to Boolean
Object.prototype.parseBool = function () { 
	//negative numbers return false
	return parseBool(this); }

//Array sum
Array.prototype.sum = function(returnType, stringSeparator) {
	//returnType possible values: "number" / "string"
	if(isNullOrEmpty(this)) {
		console.log("Array sum error: target is null or empty");
		return 0;
	}
	if(isNullOrEmpty(returnType))
		returnType = Object.prototype.toString.call(this[0]);
	if(isNullOrEmpty(stringSeparator))
		stringSeparator = "";
	else
		stringSeparator = String(stringSeparator);

	var returnSum;
	switch(returnType.toLowerCase()) {
		case "number": case "[object number]":
			returnSum = 0;
			for(var i = 0; i < this.length; i += 1) {
				returnSum += +this[i]; }
			break;
		case "string": case "[object string]":
			returnSum = "";
			for(var i = 0; i < this.length; i += 1) {
				returnSum += String(this[i]) + stringSeparator; }
			break;
		default:
			console.log("Array sum error: returnType - "+ returnType +" - not supported");		
	}

	return returnSum;
}


/* ^ PROTOTYPES ^ */