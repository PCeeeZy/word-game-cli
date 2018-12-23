let inquirer = require('inquirer');
var Word = require('./Word');
var character = require('./pyschic');
const fs = require("fs");
let playWords = ['See you','gods plan','idol'];
const chars = "abcdefghijklmnopqrstuvwxyz";
let counter = 16;
let wordLosses =0,wordWins=0,letterLosses=0,letterWins=0;
getSavedScores();

function playWord(word){
    word.displayWord();
    inquirer.prompt([
        {
            message:'guess a letter',
            name:'guess'
        }
    ]).then(function(response){
        if(counter == 0){
            wordLosses++;
            writeTheScoreToFile('word_score.txt');
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
                    writeTheScoreToFile('word_score.txt');
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
            writeTheScoreToFile('psychic_score.txt');
            console.log(`The current score is ${letterWins} wins and ${letterLosses} losses.`);
            playAgainChar();
        }else{
            let letter =charToPlay.checkLetter(response.guess)
            if(typeof letter != 'undefined' && letter.guessed){
                counter--;
                console.log('You won this turn');
                letterWins++;
                writeTheScoreToFile('psychic_score.txt');
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
function writeTheScoreToFile(file){
    switch (file) {
        case 'word_score.txt':
            fs.writeFile(file,'wins: '+wordWins+'\n'+'losses: '+wordLosses,function(err){if(err) console.log(err);});
            break;
        case 'psychic_score.txt':
            fs.writeFile(file,'wins: '+letterWins+'\n'+'losses: '+letterLosses,function(err){if(err) console.log(err);});
            break;
    }
}
function getSavedScores(){
    fs.readFile('word_score.txt',function(err,data){
        if(err){
            console.log(err);
            return;
        }
        let scores = data.toString().split('\n');
        let win_score = scores[0].toString().split(":");
        wordWins = parseInt(win_score[1]);
        let lose_score = scores[1].toString().split(":");
        wordLosses = parseInt(lose_score[1]);
    });
    fs.readFile('psychic_score.txt',function(err,data){
        if(err){
            console.log(err);
            return;
        }
        let scores = data.toString().split('\n');
        let win_score = scores[0].toString().split(":");
        letterWins = parseInt(win_score[1]);
        let lose_score = scores[1].toString().split(":");
        letterLosses = parseInt(lose_score[1]);
    });
}
play();
