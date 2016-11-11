/**
 * Created by christopherli on 11/4/16.
 */

var globals = {};

$(document).ready(function(){

    var i = 0;

    $('#start').click(function(){

        if(!globals.game || globals.game.currentState.status === 'end') {

            globals.game = new Game();
            var ai = new AI();

            ai.plays(globals.game);
            globals.game.aiPlayer(ai);

            globals.game.start();
        }
    });

$('.cell').click(function(){

    var game = globals.game;

    if(game && game.currentState.turn === 'human' && !game.currentState.locked) {

        var sequence = game.currentState.sequence;
        var userChoice = $(this).data('indx');

        $(this).addClass("light").delay(500).queue(function(){
            $(this).removeClass("light").dequeue();
        });

        ui.playSound(parseInt(userChoice));

        console.log('userChoice: ' + userChoice +  ' seq val: ' + sequence[game.currentState.i] + ' i: ' + game.currentState.i);
        console.log(sequence);

        if((userChoice === sequence[game.currentState.i]) && (game.currentState.i === (game.currentState.sequence.length - 1))){

            if(game.currentState.sequence.length === 10){
                ui.switchViewTo('win');
            }

            else {
                var next = new State(game.currentState);
                
                next.advanceTurn();
                next.setLock(true);
                next.resetItr();

                setTimeout(function() {
                    game.advanceTo(next);
                }, 1000);

            }
        }

        else if (userChoice === sequence[game.currentState.i]) {
            game.currentState.iterate();
        }
        else {
            
            game.currentState.setLock(true);
            
            setTimeout(function() {
                game.advanceTo(game.currentState);
            }, 1000);
        }
    }

})


});
