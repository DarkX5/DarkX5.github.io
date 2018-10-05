var saveName = "saveGame";
var playerNo = 0;
var currentPlayer = -1;
var roundsNoArray = [];
var tempCurrentRound;

var colorPositive = "rgba(47, 158, 194, 0.25)";
var colorPositiveBonus = "rgba(47, 158, 194, 1)";
var colorNegative = "rgba(255, 0, 0, 0.25)";
var colorNegativeBonus = "rgba(255, 0, 0, 1)";

/* TODO - json value for testing purpuses*/
var gameData = {
    "playerInfo": [{
        "totalScore": 0,
        "bonus": 0,
        "playerName": "Player 1",
        "gameTable": {
            "auctionVal": [1, 0, 1, 2],
            "doneVal": [0, 1, 0, 2],
            "totalVal": [0, 1, 0, 2],
            "bonusVal": [0, 1, 0, 2]
        }
    }],
    "currentRound": -1,
    "gameLength": 2,
    "bonus": 10,
    "maxRound": 0
};

//verificare NullOrEmpty
function isNullOrEmpty(checkVar) {
    var emptyArr = ["undefined", "null", "NaN", ""],
        emptyObj = ["{}", "[]"];
    if (emptyObj.indexOf(JSON.stringify(checkVar)) > -1) {
        return true;
    }
    try {
        checkVar = checkVar.replace(/ /g, "");
    } catch (ex) {}

    if (emptyArr.indexOf(String(checkVar)) > -1) {
        return true;
    }

    return false;
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
		returnVar = {};
	
	// Return the high score
	return returnVar;
}

//SET Local Storage Variable
function setLS(varName, newVal) {

	if(isNullOrEmpty(varName)) {
		console.log('Error "setLS()" - Invalid variable name');
		return varName;
	}
	
	if(isNullOrEmpty(newVal))
		newVal = {};
		
	localStorage.setItem(varName, newVal);
}

function getOSName() {
    if (navigator.appVersion.indexOf("Win") != -1) return "Windows";
    if (navigator.appVersion.indexOf("Mac") != -1) return "MacOS";
    if (navigator.appVersion.indexOf("X11") != -1) return "UNIX";
    if (navigator.appVersion.indexOf("Android") != -1) return "Android";
    else if (navigator.appVersion.indexOf("Linux") != -1) return "Linux";

    return "Unknown OS";
}

function showMsg(msgText) {
    $("#msgBox").text(msgText);
    $("#msgBox").show();
}

function hideMsg() {
    $("#msgBox").text("");
    $("#msgBox").hide();
}

function checkNo(event, element, minNo, maxNo) {
    //debugger;
    var keyCode;
    try {
        keyCode = event.which - 48; //parseInt(String.fromCharCode(event.which), 10);
    } catch (e) {
        event.preventDefault();
        return;
    }

    if ((keyCode < minNo || keyCode > maxNo) && (String(keyCode) !== "-40")) { //minNo || keyCode > maxNo) {
        //-40 : backspace key
        event.preventDefault();
        $(String(element)).val(minNo); //"#tbSetupPlayerNo").val(2);
    } else {
        if (String(keyCode) !== "-40") {
            event.preventDefault();
            $(String(element)).val(keyCode); //String.fromCharCode(event.keyCode));
        }
    }
}

function setPlayerNo() {
    hideMsg();
    var pNo = parseInt($("#tbSetupPlayerNo").val(), 10);

    if (isNullOrEmpty(pNo)) {
        showMsg("Please set the number of players");
        return false;
    }
    if (pNo < 2 || pNo > 6) {
        showMsg("Number of players is outside of addmissible range (2-6)");
        return false;
    }

    try {
        playerNo = parseInt(pNo, 10);
    } catch (ex) {
        return false;
    }

    currentPlayer = 0;
    gameData = {
        "playerInfo": [],
        "gameLength": 2,
        "bonus": 10
    };

    return true;
}

function setGameSettings() {
    $("#divSetupMsg").text("Please set the game length and bonuses:");
    $("#gameSetupRow").show();
    $("#btnStartGame").css("display", "block");
}

function parseNo(txtVal) {
    /*jslint regexp: true*/
    var parsedTextNo = txtVal.replace(/[^(\d)]/, "");
    /*jslint regexp: false*/
    return parsedTextNo;
}

function hideDetails(target) {
    var pNo, i;
    if (target === undefined) {
        if ($("#thp1").attr("colspan") === "3") {
            $(".auctionCol").hide();
            $(".doneCol").hide();
            $(".playerHead").attr("colspan", "1");
        } else {
            $(".auctionCol").show();
            $(".doneCol").show();
            $(".playerHead").attr("colspan", "3");
        }
    } else {
        pNo = target.id[target.id.length - 1];
        if (target.colSpan === 3) {
            $(".auctionCol.pa" + pNo).hide();
            $(".doneCol.pd" + pNo).hide();
            $("#" + target.id).attr("colspan", "1");
        } else {
            $(".auctionCol.pa" + pNo).show();
            $(".doneCol.pd" + pNo).show();
            $("#" + target.id).attr("colspan", "3");
        }
    }
}

function refreshTable() {

}

function loadPageStartupValues() {
    var i;
    for (i = 1; i <= 6; i += 1) {
        $(".pa" + i).hide();
        $(".pd" + i).hide();
        $(".pt" + i).hide();
    }
}

function setPlayerNameNext() {
    hideMsg();
    if (!isNullOrEmpty($("#tbSetupPlayerName")
            .val())) {
        gameData.playerInfo.push({
            "totalScore": 0,
            "bonus": 0,
            "playerName": $("#tbSetupPlayerName").val(),
            "gameTable": {
                "auctionVal": [],
                "doneVal": [],
                "totalVal": [],
                "bonusVal": []
            }
        });

        $("#scoreHeaderRow1").append('<th id="thp' + String(currentPlayer + 1) + '" class="headerRowStyle playerHead pt"' + String(currentPlayer + 1) + '>' + gameData.playerInfo[currentPlayer].playerName + '</th>');
        $("#scoreHeaderRow2").append('<th class="headerRowStyle auctionCol pa' + String(currentPlayer + 1) + '">A</th>');
        $("#scoreHeaderRow2").append('<th class="headerRowStyle doneCol pd' + String(currentPlayer + 1) + '">D</th>');
        $("#scoreHeaderRow2").append('<th class="headerRowStyle totalCol pt' + String(currentPlayer + 1) + '">Total</th>');

        $(".pa" + (currentPlayer + 1)).hide();
        $(".pd" + (currentPlayer + 1)).hide();
        $(".pt" + (currentPlayer + 1)).show();
        //$("#gameTableDiv").show();

        //current game table set
        $(".currentPlayerHead.cpt" + (currentPlayer + 1)).text(gameData.playerInfo[currentPlayer].playerName);
        $(".currentPlayerHead.cpt" + (currentPlayer + 1)).show();
        $(".currentAuctionCol.cpa" + (currentPlayer + 1)).show();
        $(".currentDoneCol.cpd" + (currentPlayer + 1)).show();
        //$(".currentRow.auctionCol.pa" + (currentPlayer + 1)).show();
        //$(".currentRow.doneCol.pd" + (currentPlayer + 1)).show();

        if (currentPlayer + 1 < playerNo) {
            currentPlayer += 1;
            $("#divSetupMsg").text("Please set the name of Player " + (currentPlayer + 1) + " :");
            $("#tbSetupPlayerName").val("").focus();
        } else {
            $("#navbarFiller").height($(".navbar.navbar-default.navbar-fixed-top").height() + 30);
            $("#tbSetupPlayerName").hide();
            $("#"+ o.btns.setupBack).hide();
            $("#"+ o.btns.setupNext).hide();
            setGameSettings();
        }
    } else {
        showMsg("Please set the name of Player " + (currentPlayer + 1));
    }
}

function setPlayerNameBack() {
    hideMsg();
    gameData.playerInfo.pop();
    if (currentPlayer > 0) {
        $(".pt" + currentPlayer).hide();
        currentPlayer -= 1;
        $("#divSetupMsg").text("Please set the name of Player " + (currentPlayer + 1) + ":");
    } else {
        $("#btnSetupPlayerNo").show();
        $("#tbSetupPlayerNo").show();

        $("#divSetupMsg").text("Please set the number of players:");
        $("#tbSetupPlayerName").hide();
        $("#btnSetupBack").hide();
        $("#btnSetupNext").hide();
    }
}

function startGame(isLoad) {
    $("#setupDiv").hide();
    $("#currentGameDiv").show();
    $("#gameTableDiv").show();
    $("#btnStartGame").hide();
    $("#navbarFiller").height($(".navbar.navbar-default.navbar-fixed-top").height() + 30);
    //$("#gameTableDiv").width($(window).width() - 5);


    $("#currentAuctionBox").show();
    $("#currentDoneBox").hide();
    $("#currentAuction").focus();

    if (isNullOrEmpty(isLoad) || isLoad === false) {
        $("#lblCurrentPlayer").text(gameData.playerInfo[0].playerName);
        $("#currentName").text(gameData.playerInfo[0].playerName);

        currentPlayer = 0;
        gameData.currentRound = 0;
        gameData.maxRound = 12 + (playerNo * (gameData.gameLength + 2));
        $("#scoreBody").append('<tr id="row' + gameData.currentRound + '" class="row' + gameData.currentRound + ' scoreTableRow"></tr>');

        var i, j, rowContent, tdRoundNo = 1;
        for (i = 0; i < gameData.maxRound; i += 1) {
            //rowContent += '<td class="row' + i + ' tdRound">';
            if (i >= playerNo && i <= (playerNo + 6)) {
                tdRoundNo += 1;
            } else {
                if ((i >= (6 + (gameData.gameLength * (playerNo + 1)))) && i <= (gameData.maxRound - playerNo)) {
                    tdRoundNo -= 1;
                }
            }
            roundsNoArray.push(tdRoundNo);
            /*
            rowContent += tdRoundNo + '</td>';
            for (j = 0; j < playerNo; j += 1) {
                rowContent += '<td class="row' + i + ' auctionCol pa' + String(j + 1) + '"></td>';
                rowContent += '<td class="row' + i + ' doneCol pd' + String(j + 1) + '"></td>';
                rowContent += '<td class="row' + i + ' totalCol pt' + String(j + 1) + '"></td>';
            }

            $("#scoreBody").append('<tr class="row' + i + ' scoreTableRow">' + rowContent + "</tr>");
            rowContent = '';
            hideDetails();
            */
        }
    }
}
// TODO - set bonus
function setBonus(cPlayer, currentRoundOk) {
    var okPositive = true;
    var okNegative = true;
    if ((gameData.currentRound >= (4 + playerNo)) && (gameData.currentRound < (gameData.maxRound - playerNo))) {
        var i = gameData.currentRound - 1;
        if (currentRoundOk) {
            for (;
                (i > gameData.currentRound - 5); i -= 1) {
                if ((gameData.playerInfo[cPlayer].gameTable.auctionVal[i] !== gameData.playerInfo[cPlayer].gameTable.doneVal[i]) || (gameData.playerInfo[cPlayer].gameTable.bonusVal[i] !== 0))
                    okPositive = false;
            }
            if (okPositive)
                return gameData.bonus;
        } else {
            for (;
                (i > gameData.currentRound - 5); i -= 1) {
                if ((gameData.playerInfo[cPlayer].gameTable.auctionVal[i] === gameData.playerInfo[cPlayer].gameTable.doneVal[i]) || (gameData.playerInfo[cPlayer].gameTable.bonusVal[i] !== 0))
                    okNegative = false;
            }
            if (okNegative)
                return gameData.bonus * (-1);
        }
    }

    return 0;
}

function nextAction() {
    if (gameData.currentRound < gameData.maxRound) {
        var rowContent = '<td class="row' + gameData.currentRound + ' tdRound">' + String(roundsNoArray[gameData.currentRound]) + '</td>';
        if ($("#currentAuctionBox").css("display") !== "none") {
            if (!isNullOrEmpty($("#currentAuction").val())) {
                hideMsg();

                if (currentPlayer + 1 === playerNo) {
                    var totalAuction = parseInt($("#currentAuction").val(), 10);
                    for (var i = 0; i < gameData.playerInfo.length - 1; i += 1) {
                        totalAuction += gameData.playerInfo[i].gameTable.auctionVal[gameData.currrentRound];
                    }
                    if (totalAuction == roundsNoArray[gameData.currentRound]) {
                        showMsg("This Auction is not permitted");
                        return;
                    }
                }
                gameData.playerInfo[currentPlayer].gameTable.auctionVal.push(parseInt($("#currentAuction").val(), 10));
                $("#currentAuction").val("");
                $(".currentRow.currentAuctionCol.cpa" + (currentPlayer + 1)).text(gameData.playerInfo[currentPlayer].gameTable.auctionVal[gameData.currentRound]);

                if (currentPlayer + 1 < playerNo) {
                    $("#currentAuction").focus();
                    currentPlayer += 1;
                } else {
                    $("#currentAuctionBox").hide();
                    $("#currentDoneBox").show();
                    $("#currentDone").focus();
                    currentPlayer = 0;
                }
                $("#currentName").text(gameData.playerInfo[currentPlayer].playerName);

                //.append('<td class="row' + gameData.currentRound + ' auctionCol pa' + String(currentPlayer) + '">' + gameData.playerInfo[currentPlayer].gameTable.auctionVal[gameData.currentRound] + '</td>');

            } else {
                showMsg("Set Auction value");
            }
        } else {
            if (!isNullOrEmpty($("#currentDone").val())) {
                hideMsg();

                gameData.playerInfo[currentPlayer].gameTable.doneVal.push(parseInt($("#currentDone").val(), 10));

                $(".currentRow.currentDoneCol.cpd" + (currentPlayer + 1)).text(gameData.playerInfo[currentPlayer].gameTable.doneVal[gameData.currentRound]);

                $("#currentDone").val("");
                if (currentPlayer + 1 < playerNo) {
                    $("#currentDone").focus();
                    currentPlayer += 1;
                } else {
                    $("#currentAuctionBox").show();
                    $("#currentDoneBox").hide();
                    $("#currentAuction").focus();

                    $("#scoreBody").append(tempCurrentRound);
                    $("#scoreBody").append('<tr id="Row' + gameData.currentRound + '" class="row' + gameData.currentRound + ' scoreTableRow"><td class="row' + gameData.currentRound + ' tdRound">' + roundsNoArray[gameData.currentRound] + '</td></tr>');

                    //TODO append current round to score body
                    var tempAVal, tempDVal, tempTVal, tempBonus, cellABgColor, cellDBgColor, cellTBgColor;
                    for (var i = 0; i < playerNo; i += 1) {
                        tempAVal = parseInt($(".currentRow.currentAuctionCol.cpa" + (i + 1)).html(), 10);
                        tempDVal = parseInt($(".currentRow.currentDoneCol.cpd" + (i + 1)).html(), 10);
                        tempBonus = setBonus(i, (tempAVal === tempDVal));
                        tempTVal = parseInt((tempAVal === tempDVal ? 5 + tempAVal : Math.abs(tempAVal - tempDVal) * (-1)), 10) + tempBonus;
                        gameData.playerInfo[i].gameTable.bonusVal.push(tempBonus);

                        //set player total & bonuses
                        gameData.playerInfo[i].gameTable.totalVal.push(tempTVal);
                        gameData.playerInfo[i].totalScore += tempTVal;

                        cellTBgColor = '';
                        if (tempTVal > 0) {
                            cellABgColor = ' style="background-color:' + colorPositive + '"';
                            cellDBgColor = ' style="background-color:' + colorPositive + '"';
                        } else {
                            cellABgColor = ' style="background-color:' + colorNegative + '"';
                            cellDBgColor = ' style="background-color:' + colorNegative + '"';
                        }
                        if (tempBonus > 0) {
                            cellTBgColor = ' style="background-color:' + colorPositiveBonus + '"';
                        } else if (tempBonus < 0) {
                            cellTBgColor = ' style="background-color:' + colorNegativeBonus + '"';
                        }

                        $("#Row" + gameData.currentRound).append('<td class="row' + gameData.currentRound + ' auctionCol pa' + (i + 1) + '"' + cellABgColor + '>' + tempAVal + '</td>');
                        $("#Row" + gameData.currentRound).append('<td class="row' + gameData.currentRound + ' doneCol pd' + (i + 1) + '"' + cellDBgColor + '>' + tempDVal + '</td>');
                        $("#Row" + gameData.currentRound).append('<td class="row' + gameData.currentRound + ' totalCol pt' + (i + 1) + '"' + cellTBgColor + '>' + tempTVal + '</td>');

                        $(".headerRowStyle.totalCol.pt" + (i + 1)).html(gameData.playerInfo[i].totalScore);
                    }
                    if ($("#thp1").attr("colspan") !== "3") {
                        $(".auctionCol").hide();
                        $(".doneCol").hide();
                    }
                    $("#currentRow .currentAuctionCol").html("");
                    $("#currentRow .currentDoneCol").html("");

                    currentPlayer = 0;
                    gameData.currentRound += 1;

                }
                $("#currentName").text(gameData.playerInfo[currentPlayer].playerName);
            } else {
                showMsg("Set Done value");
            }
        }
    }
}

function previousAction() {
    //delete last table row
    var table = $("#scoreBody"); //document.getElementById("scoreBody");
    if (table.rows.length > 1) {
        table.deleteRow(table.rows.length - 1);

        gameData.currentRound -= 1;
        currentPlayer = 0;

        for (var i = 0; i < playerNo; i += 1) {
            gameData.playerInfo[i].totalScore -= (gameData.playerInfo[i].gameTable.totalVal[gameData.currentRound]);
            gameData.playerInfo[i].totalScore -= (gameData.playerInfo[i].gameTable.bonusVal[gameData.currentRound]);
            gameData.playerInfo[i].gameTable.bonusVal.pop();
            gameData.playerInfo[i].gameTable.totalVal.pop();
            gameData.playerInfo[i].gameTable.doneVal.pop();
            gameData.playerInfo[i].gameTable.auctionVal.pop();
        }
    }
}

function loadGameData() {
    //empty current table
    $("#scoreHeaderRow1").html('<th id="detailsBtn" class="thRound">#</th>');
    $("#scoreHeaderRow2").html('<th class="thRound"><img src="./IMG/refresh.png" class="img-responsive"></th>');
    $("#scoreBody").empty();

    startGame(true);

    var i, j;
    for (i = 0; i < gameData.playerInfo.length; i += 1) {
        $("#scoreHeaderRow1").append('<th id="thp' + String(i + 1) + '" class="headerRowStyle playerHead pt"' + String(i + 1) + '>' + gameData.playerInfo[i].playerName + '</th>');
        $("#scoreHeaderRow2").append('<th class="headerRowStyle auctionCol pa' + String(i + 1) + '">A</th>');
        $("#scoreHeaderRow2").append('<th class="headerRowStyle doneCol pd' + String(i + 1) + '">D</th>');
        $("#scoreHeaderRow2").append('<th class="headerRowStyle totalCol pt' + String(i + 1) + '">Total</th>');

        $(".pa" + (i + 1)).hide();
        $(".pd" + (i + 1)).hide();
        $(".pt" + (i + 1)).show();
        //$("#gameTableDiv").show();

        //current game table set
        $(".currentPlayerHead.cpt" + (i + 1)).text(gameData.playerInfo[i].playerName);
        $(".currentPlayerHead.cpt" + (i + 1)).show();
        $(".currentAuctionCol.cpa" + (i + 1)).show();
        $(".currentDoneCol.cpd" + (i + 1)).show();
    }

}

function saveGame() {
    var osName = getOSName();
    if ((osName !== "Android" && osName !== "Iphone") && (osName === "Windows" || osName === "Linux" || osName === "UNIX" || osName === "Unknown OS")) {
        //filename text
        var fileName = prompt("Please enter the save name", "WistSave");

        if (fileName !== null) {
            var fileData = "gameData = "
            fileData += JSON.stringify(gameData);
            fileData += "\n\n\n";
            fileData += "roundsNoArray = ";
            fileData += JSON.stringify(roundsNoArray);

            var pom = document.createElement('a');
            pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(fileData));
            pom.setAttribute('download', fileName + ".sav");

            if (document.createEvent) {
                var event = document.createEvent('MouseEvents');
                event.initEvent('click', true, true);
                pom.dispatchEvent(event);
            } else {
                pom.click();
            }
        }
    } else {
        if (osName === "Android") {
			
			var fileData = "gameData = "
			fileData += JSON.stringify(gameData);
			fileData += "\n\n\n";
			fileData += "roundsNoArray = ";
			fileData += JSON.stringify(roundsNoArray);

			setLS( saveName, fileData );

        } else if (osName === "Iphone") {

        }
    }
}

function loadGame(/*evt*/) {

	var saveData = getLS( saveName );

/*
    //daw table from value array
    var tableBody = $("#scoreBody");
    gameData = {};
    roundsNoArray = [];

    var files = evt.target.files; // FileList object
	
    
	// use the 1st file from the list
    f = files[0];

    var reader = new FileReader();

    // Closure to capture the file information.
    reader.onload = (function (theFile) {
        return function (e) {
            eval(e.target.result);
            loadGameData();
        };
    })(f);

    // Read in the image file as a data URL.
    reader.readAsText(f);
*/
}