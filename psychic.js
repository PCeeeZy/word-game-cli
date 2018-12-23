const availLetters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "y", "x", "y", "z"];

const inquirer = require('inquirer');
const figlet = require('figlet');
const fs = require('fs');
// const scoreboard = require('./scoreboard');

const psyScoreboard = {
    wins: 0,
    losses: 0
}
let wins = psyScoreboard.wins;
let losses = psyScoreboard.losses;
var counter;
var compWord;
var randomNum;

// GAMESTARt()
function psychicStart() {
// computer chooses letter randomly
     randomNum = Math.floor(Math.random() * 26);
     compWord = availLetters[randomNum];
     counter = 12;
    // start gameplay loop
    psychicLoop();
}

// GAMEPLAY()
function psychicLoop() {
    console.log(`You have ${counter} guesses remaining.`);
// inquirer prompt
    inquirer.prompt([
        {
        // input letter
            name: "userGuess",
            type: "input",
            message: "Guess which letter the computer chose"
        }
         // .then check letter against computer letter.
    ]).then(function(result) {
        // if letter is same
        if (result.userGuess.toLowerCase()===compWord) {
            console.log(`Congrats! You guessed ${result.userGuess} and so did the computer.`);
            // UPDATE WINS IN SCOREBOARD
            wins++;
            console.log(`The current score is ${wins} wins and ${losses} losses.`);
            // RUN INQUIRER INDEX

        }
        else {
        // else letter is wrong
            console.log(`Sorry you chose ${result.userGuess} which is not correct.`);
        // decrement counter by 1
            counter--;
             // if counter=0 lose
            if (counter===0) {
                console.log(`Sorry you are out of guesses and have lost\nThe correct letter was ${compWord}.`);
                // UPDATE LOSSES IN SCOREBOARD
                losses++;
                console.log(`The current score is ${wins} wins and ${losses} losses.`);
                // RUN INQUIRER INDEX
            }
            else {
            // else run gameplay loop again
            psychicLoop();
            }
        }
    })
}
psychicStart();