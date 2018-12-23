let letter = require('./Letters');
function Character(letterToGuess){
    this.savedLetter = new letter(false,letterToGuess);
   //function to call Letter display function
    this.displayLetter = function(){
    w = this.savedLetter.display()+' ';
    console.log(w);
    }
    //function to call Letter check function against
    //player guess
    this.checkLetter = function(guessedL){
        if(this.savedLetter.check(guessedL)){
            console.log("Correct!!!\n");
            console.log(this.savedLetter.display());
        }
        return this.savedLetter;
    }
}

module.exports = Character;