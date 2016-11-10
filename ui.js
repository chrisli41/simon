/**
 * Created by christopherli on 11/4/16.
 */
var ui = {};

ui.switchViewTo = function(_status){

    switch (_status){
        case 'win':
            console.log('You Won');
            break;
        case 'lose':
            console.log('You Lose');
            break;
    }

};

ui.showSeq = function(){

    var counter = 0;
    var sequence = globals.game.currentState.sequence;

    var d = jQuery.Deferred();
    var doIncrease = function() {

        if(counter < sequence.length){
            console.log(sequence[counter]);

            $("#" + sequence[counter]).addClass("light").delay(1000).queue(function(){
                $(this).removeClass("light").dequeue();
            });

            counter++;
            setTimeout(doIncrease, 2000);
        } else {
            d.resolve();
        }
    };
    doIncrease();
    return d.promise();
};
