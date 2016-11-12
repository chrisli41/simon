/**
 * Created by christopherli on 11/4/16.
 */
var ui = {};

var audio0 = new Audio('sounds/simonSound1.mp3');
var audio1 = new Audio('sounds/simonSound2.mp3');
var audio2 = new Audio('sounds/simonSound3.mp3');
var audio3 = new Audio('sounds/simonSound4.mp3');

ui.showSequence = function(){

    var counter = 0;
    var sequence = globals.game.currentState.getSequence();

    var d = jQuery.Deferred();
    var startSeq = function() {

        if(counter < sequence.length){

            ui.playSound(sequence[counter]);

            $("#" + sequence[counter]).addClass("light").delay(800).queue(function(){
                $(this).removeClass("light").dequeue();
            });

            counter++;
            setTimeout(startSeq, 2000);

        } else {
            d.resolve();
        }
    };
    startSeq();
    return d.promise();
};

ui.playSound = function(selected){
    
    switch(selected){
        case 0:
            audio0.play();
            break;
        case 1:
            audio1.play();
            break;
        case 2:
            audio2.play();
            break;
        case 3:
            audio3.play();
            break;
    }
};

ui.switchViewTo = function(_status){

    switch (_status){
        case 'win':
            $('.cell').hide();
            $('#win').show();
            break;
        case 'lose':
            $('.cell').hide();
            $('#lose').show();
            break;
    }

};
