let letter = require('./Letters');
function Character(letterToGuess){
    this.savedLetter = new letter(false,letterToGuess);
    this.displayLetter = function(){
    w = this.savedLetter.display()+' ';
    console.log(w);
    }
    this.checkLetter = function(guessedL){
        if(this.savedLetter.check(guessedL)){
            console.log("Correct!!!\n");
            console.log(this.savedLetter.display());
        }
        return this.savedLetter;
    }
}

module.exports = Character;