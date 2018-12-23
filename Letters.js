
function Letter( guessed, letter) {
    // every letter starts out as false 
    this.guessed = false;
    this.letter = letter;
    // returns whether the letter is truthy or falsey
    this.display=function(){
        if(this.guessed){
            // returns the letter if letter is true 
            return this.letter;
        }
        // returns a hyphen if letter is false 
        return '-';
    }
    // check if guessed letter against the correct letters in the word 
    // and changes the boolean value for this.guessed 
    this.check=function(guessedLetter){
        if(this.letter === guessedLetter && !this.guessed){
            this.guessed = true;
            return true;
        }
        return false;
    }
}
module.exports = Letter;