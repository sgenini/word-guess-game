// Array of Possible Words
var possibleWords = [
    "apple",
    "apricot",
    "banana",
    "cherry",
    "dragonfruit",
    "fig",
    "grape",
    "grapefruit",
    "guava",
    "kiwi",
    "mango",
    "papaya",
    "passionfruit",
    "peach",
    "pear",
    "plum",
    "pineapple",
    "pomegranate"
]

var alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]

// Declaring Variables
var wordToGuess = "";
var blankLetters = 0;
var lettersToGuess = [];
var wordLetters = [];
var wrongLetters = [];


// Initial Score Record
var wins = 0;
var losses = 0;

// New Game Settings
function newGame() {
    var random = Math.floor(Math.random() * possibleWords.length);
    alreadyGuessed = false;
    wordToGuess = possibleWords[random];
    lettersToGuess = wordToGuess.split("");
    blankLetters = lettersToGuess.length;
    guessesLeft = 10;
    wordLetters = [];
    wrongLetters = [];
    

    // Sets placeholder letters 
    for (var i = 0; i < blankLetters; i++) {
        wordLetters.push("_");
    }

    // Displays game information
    document.getElementById("guesses-left").innerHTML = guessesLeft;
    document.getElementById("blank-spaces").innerHTML = wordLetters.join(" ");
    document.getElementById("wrong-guesses").innerHTML = wrongLetters.join(" ");
    document.getElementById("wins").innerHTML = wins;
    document.getElementById("losses").innerHTML = losses;
}

// Checks if letter pressed is correct
function letterGuess(letter) {
    var inWord = false;
    var alreadyGuessed = false;

    for (var i = 0; i < lettersToGuess.length; i++) {
        if (letter === wordToGuess[i]) {
            inWord = true;
        }
    }

    for (var l = 0; l < wrongLetters.length; l++) {
        if (letter === wrongLetters[l]) {
            alreadyGuessed = true;
        }
    }

    // Replaces blank letters with correct letters
    if (inWord) {
        for (var j = 0; j < blankLetters; j++) {
            if (letter === lettersToGuess[j]) {
                wordLetters[j] = letter;
            }
        }
    }

    // Puts in wrong letter array and removes a guess

    else if (!alreadyGuessed) {
        for (var k = 0; k < alphabet.length; k++) {
            if (letter === alphabet[k]) {
                wrongLetters.push(letter);
                guessesLeft--;
            }
        }
    }

    else {
        alert("You've already guessed that letter!");
    }

    //FINALLY GOT IT WORKING THANK JEEBUS
    //Spent a whole lot of time trying to avoid repeated incorrect letters from subtracting guesses and repeating themselves in the wrong guesses section.
    //Was very close after adding the alreadyGuessed variable, but got stuck for a good 45 minutes before realizing my error in my for loop: had wrongLetters.length mispelled.
    
}

// Checks if Win or Loss and starts new game
function checkWord() {
    document.getElementById("guesses-left").innerHTML = guessesLeft;
    document.getElementById("blank-spaces").innerHTML = wordLetters.join(" ");
    document.getElementById("wrong-guesses").innerHTML = wrongLetters.join(" ");

    if (wordLetters.toString() === lettersToGuess.toString()) {
        wins++;
        alert("Congratulations! You successfully guessed '" + wordToGuess + "'!");
        document.getElementById("wins").innerHTML = wins;
        newGame();
    }
    else if (guessesLeft === 0) {
        losses++;
        alert("Better luck next time! The word was '" + wordToGuess + "'!");
        document.getElementById("losses").innerHTML = losses;
        newGame();
    }
}

// Starts Game Upon Loading
newGame();

// When a key is pressed, run the functions
document.onkeyup = function(event) {
    var input = event.key.toLowerCase();
    letterGuess(input);
    checkWord();
    }