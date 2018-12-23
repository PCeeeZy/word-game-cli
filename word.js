let letter = require('./Letters');
function Word(wordToGuess){
    this.savedWord = [];
    this.wordRes = [];
    //create array of Letter objects
    for(var i = 0;i< wordToGuess.length;i++){
        this.savedWord.push(new letter(false,wordToGuess.charAt(i)));
    }
    //display the letters or underscore
    this.displayWord = function(){
        var w = ""; 
        for(var i =0;i < this.savedWord.length;i++){
            w += this.savedWord[i].display()+' ';
        }
        console.log(w);
    }
    //call Letter check function
    //against player guess
    this.checkLetter = function(guessedL){
        var letter;
        this.savedWord.forEach(element => {
            if(element.check(guessedL)){
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