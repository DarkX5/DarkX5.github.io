function isNullOrEmpty(value) {
    var emptyArr = ["undefined", "null", "NaN", ""],
        emptyObj = ["{}", "[]"];
    if (emptyObj.indexOf(JSON.stringify(value)) > -1)
        return true;
    try {
        value = value.replace(/ /g, "");
    } catch (ex) {}
    if (emptyArr.indexOf(String(value)) > -1)
        return true;

    return false;
};


alert(String(isNullOrEmpty("");