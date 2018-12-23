//game requirements
let inquirer = require('inquirer');
var Word = require('./Word');
var character = require('./pyschic');
const fs = require("fs");
//words to be guessed for hangman
let playWords = ['See you','gods plan','idol'];
//array of letters to randomly choose
const chars = "abcdefghijklmnopqrstuvwxyz";
//counter to end the game after 16 tries 
let counter = 16;
//score variables for both games
let wordLosses =0,wordWins=0,letterLosses=0,letterWins=0;
//provide the score variables with saved scores in the games files
getSavedScores();
//start the hangman game
function playWord(word){
    //display the word with underscore and letters guessed correctly
    word.displayWord();
    //ask the user to enter a letter
    inquirer.prompt([
        {
            message:'guess a letter',
            name:'guess'
        }
    ]).then(function(response){
        //end of the game condition
        if(counter == 0){
            wordLosses++;
            writeTheScoreToFile('word_score.txt');
            console.log(`The current score is ${wordWins} wins and ${wordLosses} losses.`);
            playAgain();
        }else{
            //get the letter after checking from word.js
            let letter =word.checkLetter(response.guess)
            //check if there is a letter came back and it's guessed correctly
            if(typeof letter != 'undefined' && letter.guessed){
                console.log('\ncorrect\n');
                counter--;
                //check if all the letters guessed correctly so it is a win
                if(word.savedWord.length == word.wordRes.length){
                    console.log('You won this turn');
                    wordWins++;
                    writeTheScoreToFile('word_score.txt');
                    console.log(`The current score is ${wordWins} wins and ${wordLosses} losses.`);
                    playAgain();
                }else{
                    //if there is still letters not been checked then continue playing
                    playWord(word);
                }
            }else{
                //in case no letter came back then he guessed incorrect letter
                console.log('\nIncorrect\n');
                counter--;
                playWord(word);
            }
        }
        
    })
}
//when the player win or lose this function gets a call
function playAgain(){
    //a prompt to tell the player if he want to continue playing hangman or return to main menu
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
//psychic game start
function playChar(charToPlay){
    //display underscore for the player
    charToPlay.displayLetter();
    inquirer.prompt([
        {
            message:'guess a letter',
            name:'guess'
        }
    ]).then(function(response){
        //loose condition
        if(counter ==0){
            letterLosses++;
            writeTheScoreToFile('psychic_score.txt');
            console.log(`The current score is ${letterWins} wins and ${letterLosses} losses.`);
            playAgainChar();
        }else{
            //get the letter from psychic js if it guessed correctly
            let letter =charToPlay.checkLetter(response.guess)
            //win condition
            if(typeof letter != 'undefined' && letter.guessed){
                counter--;
                console.log('You won this turn');
                letterWins++;
                writeTheScoreToFile('psychic_score.txt');
                console.log(`The current score is ${letterWins} wins and ${letterLosses} losses.`);
                playAgainChar();
            }else{
                //player loose of he guessed incorrectly
                console.log('\nIncorrect\n');
                counter--;
                playChar(charToPlay);
            }
        }
        
    })
}
//play psychic game a gain in case of win or lose
function playAgainChar(){
    //prompt to ask if the player like to continue the psychic game or return to main menu
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
//select word randomly from the words array
function generateWord(){
    let randomIndex = Math.floor(Math.random() * (playWords.length-1));
    let wordToGuess = playWords[randomIndex];
    let word = new Word(wordToGuess);
    return word;
}
//select letter randomly from the letters array
function generateLetter(){
    let randomIndex = Math.floor(Math.random() * (chars.length-1));
    let letterToGuess = chars.charAt(randomIndex);
    let guessedChar = new character(letterToGuess);
    return guessedChar;
}
//a function to start the game
function play(){
    //a prompt to ask the player 
    //which game to start or he want to exit
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
//function to save the scores in the files
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
//function to get the scores from the files
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
//start the game
play();
