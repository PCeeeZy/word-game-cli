const inquirer = require('inquirer');
const Word = require('./word')

inquirer
.prompt([
    {
    type: "input",
    message: "Guess a letter!",
    name: "guess"
    }

]).then(function(response){


});