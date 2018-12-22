let inquirer = require('inquirer');
var Word = require('./Word');
let playWords = ['See you','gods plan','idol'];
let counter = 16;
function play(word){
    word.displayWord();
    inquirer.prompt([
        {
            message:'guess a letter',
            name:'guess'
        }
    ]).then(function(response){
        if(counter ==0){
            playAgain();
        }
        let letter =word.checkLetter(response.guess)
        if(typeof letter != 'undefined' && letter.guessed){
            console.log('\ncorrect\n');
            counter--;
            if(word.savedWord.length == word.wordRes.length){
                console.log('You won this turn');
                playAgain();
            }else{
                play(word);
            }
        }else{
            console.log('\nIncorrect\n');
            counter--;
            play(word);
        }
    })
}
function generateWord(){
    let randomIndex = Math.floor(Math.random() * (playWords.length-1));
    let wordToGuess = playWords[randomIndex];
    let word = new Word(wordToGuess);
    return word;
}
function playAgain(){
    inquirer.prompt([
        {
            type: "confirm",
            message: "do you want to play again",
            name:"confirm"
        }
    ]).then(function(res){
        if(res.confirm){
            counter = 16;
            let word = generateWord();
            play(word);
        }else{
            console.log('Game Ended');
            process.exit();
        }
    })
}
let word = generateWord();
play(word);