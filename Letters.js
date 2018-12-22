function Letter( guessed, letter){
    this.guessed = false;
    this.letter = letter;
    this.display=function(){
        if(this.guessed){
            return this.letter;
        }
        return '-';
    }
    this.check=function(guessedLetter){
        if(this.letter === guessedLetter && !this.guessed){
            this.guessed = true;
            return true;
        }
        return false;
    }
}
module.exports = Letter;