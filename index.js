let inquirer = require('inquirer');
let wordScoreboard = require('./wordScoreboard');
let letterScoreboard = require('./LetterScoreboard');
var Word = require('./Word');
var character = require('./pyschic');
let playWords = ['See you','gods plan','idol'];
const chars = "abcdefghijklmnopqrstuvwxyz";
let counter = 16;
let wordWins = wordScoreboard.wins;
let wordLosses = wordScoreboard.losses;
let letterWins = wordScoreboard.wins;
let letterLosses = wordScoreboard.losses;
const fs = require("fs");

function playWord(word){
    word.displayWord();
    inquirer.prompt([
        {
            message:'guess a letter',
            name:'guess'
        }
    ]).then(function(response){
        if(counter ==0){
            wordLosses++;
            console.log(`The current score is ${wordWins} wins and ${wordLosses} losses.`);
            playAgain();
        }else{
            let letter =word.checkLetter(response.guess)
            if(typeof letter != 'undefined' && letter.guessed){
                console.log('\ncorrect\n');
                counter--;
                if(word.savedWord.length == word.wordRes.length){
                    console.log('You won this turn');
                    wordWins++;
                    console.log(`The current score is ${wordWins} wins and ${wordLosses} losses.`);
                    playAgain();
                }else{
                    playWord(word);
                }
            }else{
                console.log('\nIncorrect\n');
                counter--;
                playWord(word);
            }
        }
        
    })
}
function playAgain(){
    inquirer.prompt([
        {
            type: "confirm",
            message: "do you want to play WORD GUESS again",
            name:"confirm"
        }
    ]).then(function(res){
        if(res.confirm){
            counter = 16;
            let word = generateWord();
            playWord(word);
        }else{
            console.log('Game Ended');
            play();
        }
    })
}
function playChar(charToPlay){
    charToPlay.displayLetter();
    inquirer.prompt([
        {
            message:'guess a letter',
            name:'guess'
        }
    ]).then(function(response){
        if(counter ==0){
            letterLosses++;
            console.log(`The current score is ${letterWins} wins and ${letterLosses} losses.`);
            playAgainChar();
        }else{
            let letter =charToPlay.checkLetter(response.guess)
            if(typeof letter != 'undefined' && letter.guessed){
                counter--;
                console.log('You won this turn');
                letterWins++;
                console.log(`The current score is ${letterWins} wins and ${letterLosses} losses.`);
                playAgainChar();
            }else{
                console.log('\nIncorrect\n');
                counter--;
                playChar(charToPlay);
            }
        }
        
    })
}
function playAgainChar(){
    inquirer.prompt([
        {
            type: "confirm",
            message: "do you want to play PSYCHIC again",
            name:"confirm"
        }
    ]).then(function(res){
        if(res.confirm){
            counter = 16;
            let char = generateLetter();
            playChar(char);
        }else{
            console.log('Game Ended');
            play();
        }
    })
}
function generateWord(){
    let randomIndex = Math.floor(Math.random() * (playWords.length-1));
    let wordToGuess = playWords[randomIndex];
    let word = new Word(wordToGuess);
    return word;
}
function generateLetter(){
    let randomIndex = Math.floor(Math.random() * (chars.length-1));
    let letterToGuess = chars.charAt(randomIndex);
    let guessedChar = new character(letterToGuess);
    return guessedChar;
}
function play(){
    inquirer.prompt([
        {
            type:'list',
            message:"Choose what game to play",
            choices:['Word Guess Game','Psychic Game','exit'],
            name:'gameChoice'
        }
    ]).then(function(response){
        switch (response.gameChoice) {
            case 'Word Guess Game':
                let word = generateWord();
                playWord(word);
                break;
        
            case 'Psychic Game':
                let char = generateLetter();
                playChar(char);
                break;
            case 'exit':
                console.log('Goodbye so sad to leave me');
                process.exit();
        }
    });
}
play();
