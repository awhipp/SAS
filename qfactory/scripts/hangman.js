// Global variables
var canvas = document.getElementById('stage'),
	word = document.getElementById('word'),
	letters = document.getElementById('letters'),
	wordToGuess,
	wordLength,
	badGuesses,
	correctGuesses,
	beginning_index,
	ending_index,
	start_time, timerID, timer, wins, losses;

var combined, M, Y, Q1, Q2, V1, V2, O1, O2;
function init() {
	
	combined = new Image();
	combined.src = 'images/myqvo_combined.png';
	M = new Image();
	M.src = 'images/M.png';
	Y = new Image();
	Y.src = 'images/Y.png';
	Q1 = new Image();
	Q1.src = 'images/Q1.png';
	Q2 = new Image();
	Q2.src = 'images/Q2.png';
	V1 = new Image();
	V1.src = 'images/V1.png';
	V2 = new Image();
	V2.src = 'images/V2.png';
	O1 = new Image();
	O1.src = 'images/O1.png';
	O2 = new Image();
	O2.src = 'images/O2.png';
	
	var helptext = $('#helptext'),
		w = screen.availWidth <= 800 ? screen.availWidth : 800;
	timer = 30;
	// Hide the loading message and display the control buttons
	$('#loading').hide();
	$('#play').css('display', 'inline-block').click(newGame);
	$('#end_game').css('display', 'inline-block').click(endGame);
	$('#help').click(function(e) {
		$('body').append('<div id="mask"></div>');
        helptext.show().css('margin-left', (w-300)/2 + 'px');
    });
	$('#close').click(function(e) {
		$('#mask').remove();
        helptext.hide();
    });
	
	// Rescale the canvas if the screen is wider than 700px
	if (screen.innerWidth >= 700) {
		canvas.getContext('2d').scale(1.5, 1.5);
	}
// Initialize the scores and store locally if not already stored
	wins = 0;
	losses = 0;
	showScore();
}

// Display the score in the canvas
function showScore() {
	var won = wins,
	    lost = losses,
		c = canvas.getContext('2d');
	// clear the canvas
	canvas.width = canvas.width;
	c.font = 'bold 24px Optimer, Arial, Helvetica, sans-serif';
    c.fillStyle = 'red';
	c.textAlign = 'center';
	c.fillText('YOUR SCORE', 100, 50);
	c.font = 'bold 18px Optimer, Arial, Helvetica, sans-serif';
	c.fillStyle = 'grey';
	c.fillText('Wins: ' + won, 100, 80);
	c.fillText('Losses: ' + lost, 100, 110);
	word.innerHTML = '';
	letters.innerHTML = '';
}


// Start new game
function newGame() {
	var placeholders = '',
		frag = document.createDocumentFragment(),
		abc = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
	badGuesses = 0;
	correctGuesses = 0;
	wordToGuess = getWord();
	wordLength = wordToGuess[1].length;
	start_time=new Date();
	// create row of underscores the same length as letters to guess
	for (var i = 0; i < wordLength; i++) {
		placeholders += '_';
	}
	word.innerHTML = wordToGuess[0].replace("_",placeholders);
	beginning_index = word.innerHTML.indexOf("_");
	ending_index = word.innerHTML.lastIndexOf("_");
	// create an alphabet pad to select letters
	letters.innerHTML = '';
	for (i = 0; i < 26; i++) {
		var div = document.createElement('div');
		div.style.cursor = 'pointer';
		div.innerHTML = abc[i];
		div.onclick = getLetter;
		frag.appendChild(div);
	}
	letters.appendChild(frag);
	timerID = setInterval( "drawCanvas()", 1000 );
}

// Get selected letter and remove it from the alphabet pad
function getLetter() {
	checkLetter(this.innerHTML);
	this.innerHTML = '&nbsp;';
	this.style.cursor = 'default';
	this.onclick = null;
}

// Check whether selected letter is in the word to be guessed
function checkLetter(letter) {
	var placeholders = word.innerHTML.substring(beginning_index,ending_index+1),
	    wrongGuess = true;
	// split the placeholders into an array
	placeholders = placeholders.split('');
	// loop through the array
	for (var i = 0; i < wordLength; i++) {
		// if the selected letter matches one in the word to guess,
		// replace the underscore and increase the number of correct guesses
		if (wordToGuess[1].charAt(i) == letter.toLowerCase()) {
			placeholders[i] = letter;
			wrongGuess = false;
			correctGuesses++;
			// redraw the canvas only if all letters have been guessed
			if (correctGuesses == wordLength) {
				drawCanvas();
			}
		}
	}
	// if the guess was incorrect, increment the number of bad
	// guesses and redraw the canvas
	if (wrongGuess) {
		badGuesses++;
		drawCanvas();
	}
	// convert the array to a string and display it again
	word.innerHTML = word.innerHTML.substring(0,beginning_index) + placeholders.join('') + word.innerHTML.substring(ending_index+1);
}

// Draw the canvas
function drawCanvas() {
	var c = canvas.getContext('2d');
	// reset the canvas and set basic styles
	canvas.width = canvas.width;
	
	
	c.font = 'bold 20px Optimer, Arial, Helvetica, sans-serif';
	c.fillStyle = 'red';
	remaining = timer-parseInt(((new Date()-start_time))/1000);
	if(remaining <= 0){
		clearInterval( timerID );
		canvas.width = canvas.width;	
		c.font = 'bold 20px Optimer, Arial, Helvetica, sans-serif';
		c.fillStyle = 'red';
		c.fillText("Time is Up!",35,110);
		
		// remove the alphabet pad
		letters.innerHTML = '';
		// display the correct answer
		// need to use setTimeout to prevent race condition
		setTimeout(showResult, 200);
		clearInterval( timerID );

		// increase score of lost games
		losses = losses + 1;
	}else{
		c.fillText("Time Remaining: " + remaining.toString(),10,220);
	
	
		if( badGuesses == 0 ){
			c.drawImage(combined,5,0);
		}
		
		if( badGuesses == 1 ){
			c.drawImage(M,5,0);
			c.drawImage(Y,5,0);
			c.drawImage(Q1,5,0);
			c.drawImage(Q2,5,0);
			c.drawImage(V1,5,0);
			c.drawImage(V2,5,0);
			c.drawImage(O1,5,0);
		}
		
		if( badGuesses == 2 ){
			c.drawImage(M,5,0);
			c.drawImage(Y,5,0);
			c.drawImage(Q1,5,0);
			c.drawImage(Q2,5,0);
			c.drawImage(V1,5,0);
			c.drawImage(V2,5,0);
		}
		
		if( badGuesses == 3 ){
			c.drawImage(M,5,0);
			c.drawImage(Y,5,0);
			c.drawImage(Q1,5,0);
			c.drawImage(Q2,5,0);
			c.drawImage(V1,5,0);
		}
		
		if( badGuesses == 4 ){
			c.drawImage(M,5,0);
			c.drawImage(Y,5,0);
			c.drawImage(Q1,5,0);
			c.drawImage(Q2,5,0);
		}
		
		if( badGuesses == 5 ){
			c.drawImage(M,5,0);
			c.drawImage(Y,5,0);
			c.drawImage(Q1,5,0);
		}
		
		if( badGuesses == 6 ){
			c.drawImage(M,5,0);
			c.drawImage(Y,5,0);
		}
		
		if( badGuesses == 7 ){
			c.drawImage(M,5,0);
		}
		
		if( badGuesses > 7 ){
			canvas.width = canvas.width;	
			c.font = 'bold 20px Optimer, Arial, Helvetica, sans-serif';
			c.fillStyle = 'red';
			c.fillText('Ran out of Guesses', 10, 110);
			// remove the alphabet pad
			letters.innerHTML = '';
			// display the correct answer
			// need to use setTimeout to prevent race condition
			setTimeout(showResult, 200);
			clearInterval( timerID );
	
			// increase score of lost games
			losses = losses + 1;
		}
	}
	
	// if the word has been guessed correctly, display message,
	// update score of games won, and then show score after 2 seconds
	if (correctGuesses == wordLength) {
		letters.innerHTML = '';
		clearInterval( timerID );
		canvas.width = canvas.width;
		c.font = 'bold 20px Optimer, Arial, Helvetica, sans-serif';
		c.fillStyle = 'red';
		c.drawImage(M,5,0);
		c.drawImage(Y,5,0);
		c.drawImage(Q1,5,0);
		c.drawImage(Q2,5,0);
		c.drawImage(V1,5,0);
		c.drawImage(V2,5,0);
		c.drawImage(O1,5,0);
		c.drawImage(O2,5,0);
		c.fillText('You Won!', 65, 220);
        // increase score of won games
        // display score
		wins = wins + 1;
	}
}

function drawLine(context, from, to) {
	context.beginPath();
	context.moveTo(from[0], from[1]);
	context.lineTo(to[0], to[1]);
	context.stroke();
}

// When the game is over, display missing letters in red
function showResult() {
	var placeholders = word.innerHTML;
    placeholders = placeholders.split('');
	var counter = 0;
	for (i = beginning_index; i < ending_index+1; i++) {
		if (placeholders[i] == '_') {
			placeholders[i] = '<span style="color:red">' + wordToGuess[1].charAt(counter).toUpperCase() + '</span>';
		}
		counter ++;
	}
	word.innerHTML = placeholders.join('');
}

// Reset stored scores to zero
function endGame() {
	if(timerID != null){
		clearInterval( timerID );
	}
	showScore();
}

// Select random word to guess
function getWord() {
 var blanks = new Array('myqvo','alex','to','gerald');
  var sentences = new Array('This is for _','_ made this', 'Play _ Win','_');  
  var index = parseInt(Math.random()* blanks.length);
  return new Array(sentences[index],blanks[index]);
}