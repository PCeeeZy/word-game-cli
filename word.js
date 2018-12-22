let letter = require('./Letters');
function Word(wordToGuess){
    this.savedWord = [];
    this.wordRes = [];
    for(var i = 0;i< wordToGuess.length;i++){
        this.savedWord.push(new letter(false,wordToGuess.charAt(i)));
    }
    
    this.displayWord = function(){
        var w = ""; 
        for(var i =0;i < this.savedWord.length;i++){
            w += this.savedWord[i].display()+' ';
        }
        console.log(w);
    }
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