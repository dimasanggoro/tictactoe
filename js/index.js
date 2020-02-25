
document.addEventListener('DOMContentLoaded', function() {


var optionsButton = document.getElementById("options_submit");


optionsButton.addEventListener("click", function(){

// Set o name
var oname = document.getElementById("o_input").value;

// Set x name
var xname = document.getElementById("x_input").value;

	if (oname === "") {
    	//...
    	alert("o name empty! please fill");
    	location.reload();
	} else if (xname === "") {
		alert("x name empty! please fill");
    	location.reload();
	}

var onames = document.getElementById("nameo");
onames.innerHTML = oname;

var xnames = document.getElementById("namex");
xnames.innerHTML = xname;


optionsButton.innerHTML = "Reset";


function isEven(value){
    if (value % 2 == 0) {
       	return true;
    } else {
        return false;
	};
};

function isOdd(value){
	if (value % 1 == 0) {
		return true;
	} else {
		return false;
	};
};

function allSame(array) { 
   
    var first = array[0];

    if (array[0] == "") {
    	return false;
    } else {
    	return array.every(function(element) {
        	return element == first;
    	});
    };
};


var customBackground = document.getElementById("boardcolor_input").value;


var boardSize = parseInt(document.getElementById("boardsize_input").value);

var gameBoard = [];

var numSquares = (boardSize * boardSize);


for (var i = 0; i < numSquares; i++) {
	gameBoard.push(i);
};


document.getElementById("game").innerHTML = '<div id="board"></div>';



var board = document.getElementById("board");


board.style.margin = '0 auto';


board.style.height = (100 * boardSize) + 'px';
board.style.width = (100 * boardSize) + 'px';


board.style.border = 'solid 1px black';


for (var i = 0; i < numSquares; i++) {
	board.innerHTML += '<div class="square"></div>'; 
};


var squares = document.getElementsByClassName("square");


for (var i = 0; i < numSquares; i++) {
	// set div squares to 100px x 100px
	squares[i].style.height = '100px';
	squares[i].style.width = '100px';
	// Float square divs left
	squares[i].style.float = "left";
	// Set div line height to 100px
	squares[i].style.lineHeight = "100px";
	// Set unique DIV IDs to each square 
	squares[i].setAttribute("id", i.toString());
};


if (numSquares % 2 !== 0) { 
	for (var i = 0; i < numSquares; i += 2) { 
		squares[i].style.backgroundColor = customBackground;
	};
} else { 
	for (i = 0; i < numSquares; i += 1) {
		if (isEven(i/boardSize)) { 
			for (var squareNum = i; squareNum < (i + boardSize); squareNum += 2) {
				squares[squareNum].style.backgroundColor = customBackground;	
			};
		} else if (isOdd(i/boardSize)) { 
			for (var squareNum = i+1; squareNum < (i + boardSize); squareNum += 2) {
				squares[squareNum].style.backgroundColor = customBackground;	
			};
		} else {
		};
	};
};

var turnIndicator = document.getElementById("turnIndicator");
var xwin = document.getElementById("x_win");
var owin = document.getElementById("o_win");


turnIndicator.style.color = "black";
turnIndicator.innerHTML = "first "+ xname +" Turn";


var boardClicks = 0;
var o_win = 0;
var x_win = 0;


board.addEventListener("click", function() {
if (determineWinner()) { 
	turnIndicator.style.color = "blue";
	var winox = winningPlayer[0];
	if (winox == 'X') {
		turnIndicator.innerHTML = xname + ' wins!';
		var number = xwin.innerHTML;
		number++;
		xwin.innerHTML = number;
		// console.log(number);
	} else {
		turnIndicator.innerHTML = oname + ' wins!';
		var number = owin.innerHTML;
		number++;
		owin.innerHTML = number;
		// console.log("ok ok")
	}
	// console.log(winox);
} else if (isEven(boardClicks)) {
	turnIndicator.style.color = "red";
	turnIndicator.innerHTML = oname +" Turn As O";
} else {
	turnIndicator.style.color = "black";
	turnIndicator.innerHTML = xname +" Turn As X";
};
boardClicks++;
}); 


var squareClicks = [];


for (var i = 0; i < numSquares; i++) {
	squareClicks[i] = 0;
};


var winningPlayer;


var determineWinner = function() {
	// Check for win by row
	for (i = 0; i < numSquares; i += 1) { 
		if ((i % boardSize) == 0) {
			var rowCheck = [];
			for (var squareNum = i; squareNum < (i + boardSize); squareNum += 1) { // iteration over column 1	
				rowCheck.push(squares[squareNum].innerHTML);
			};
			// console.log('Row ' + i + ' is ' + rowCheck);
			// console.log(allSame(rowCheck));

			if (allSame(rowCheck)) {
				winningPlayer = rowCheck; // Push winning player data
				return true;
			};
		};
	};
	// Check for win by column
	for (i = 0; i < numSquares; i += 1) { // iterate over entire board
		if (i < boardSize) { // 
			var colCheck = [];
			for (var squareNum = i; squareNum < numSquares; squareNum += boardSize) { 	
				colCheck.push(squares[squareNum].innerHTML);
			};
			// console.log('Column ' + i + 'is ' + colCheck);
			// console.log(allSame(colCheck));
			
			if (allSame(colCheck)) {
				winningPlayer = colCheck; // Push winning player data
				return true;
			};	
		};
	};
	
	var diag1Check = []; 
	for (i = 0; i < numSquares; i += 1) { 
		if ((i % (boardSize + 1)) == 0) { 
			// console.log(i)
			diag1Check.push(squares[i].innerHTML);
		};
	};
	// console.log(diag1Check) 
	// console.log(allSame(diag1Check));
	if (allSame(diag1Check)) { 
		winningPlayer = diag1Check; 
		return true;
	};
	
	var diag2Check = []; 
	for (i = (boardSize - 1); i < (numSquares - 1); i += 1) { 
		if ((i % (boardSize - 1)) == 0) { 
			// console.log(i)
			diag2Check.push(squares[i].innerHTML);
		};
	};
	// console.log(diag2Check) 
	// console.log(allSame(diag2Check));
	if (allSame(diag2Check)) { 
		winningPlayer = diag2Check; 
		return true;
	};
}; 


var countClicks = function() {
	var divID = this.getAttribute("id");
	squareClicks[divID] += 1;
	 
	if (isEven(boardClicks) && squareClicks[divID] == 1) {
		this.innerHTML = 'X';
	
	} else if (isOdd(boardClicks) && squareClicks[divID] == 1) {
		this.innerHTML = 'O';
		this.style.color = "red";
	
	} else if (!determineWinner()){
		alert('You cannot move there. That space is taken.');
		boardClicks -= 1;
	} else {
	};
	
	if (determineWinner()) { 
		
		for (var i = 0; i < numSquares; i++) {
			squareClicks[i] = 2;
		};
		
		document.getElementById("options_submit").innerHTML = "Play again?";
		var bb = document.getElementById("board");
		bb.classList.add("disabled");
	};
};


for (var i = 0; i < numSquares; i++) {
	squares[i].addEventListener("click", countClicks);
};

}); 

});
