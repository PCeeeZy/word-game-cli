// pull in the letters file 
let letter = require('./Letters');
// word constructor function passing in word to guess from the index.js file 
function Word(wordToGuess) {
    // empty array that takes in the truthy letters from the letters js file 
    this.savedWord = [];
    // where you are in the word? 
    this.wordRes = [];
    for(var i = 0;i< wordToGuess.length;i++){
        this.savedWord.push(new letter(false,wordToGuess.charAt(i)));
    }
    // displays word according to the letters constructor function truthiness
    this.displayWord = function(){
        var w = ""; 
        for(var i =0;i < this.savedWord.length;i++){ 
            // 
            w += this.savedWord[i].display()+' ';
        }
        console.log(w);
    }
    // function that checks whether guessed letter is correct or not 
    this.checkLetter = function(guessedL){
        var letter;
        // iterates through the saved word array(each single letter) to save all the correct guessed letter
        this.savedWord.forEach(element => {
            if(element.check(guessedL)){
                // if 
                this.wordRes.push(element);
                letter = element;
                return;
            }
        });
        setTimeout(function(){
            return
        },1000);
        return letter;
    }
}

module.exports = Word;