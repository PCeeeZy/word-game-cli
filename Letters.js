function Letter( guessed, letter){
    this.guessed = false;
    this.letter = letter;
    //function to display a letter or underscore
    this.display=function(){
        if(this.guessed){
            return this.letter;
        }
        return '-';
    }
    //function to check the saved letter with
    //the player guess
    this.check=function(guessedLetter){
        if(this.letter === guessedLetter && !this.guessed){
            this.guessed = true;
            return true;
        }
        return false;
    }
}
module.exports = Letter;
