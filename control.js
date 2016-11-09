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

    if(game && game.currentState.turn === 'human' && game.currentState.status === 'input') {
        var sequence = game.currentState.sequence;
        var userChoice = $(this).data('indx');

        console.log('userChoice: ' + userChoice +  ' seq val: ' + sequence[game.currentState.i] + ' i: ' + game.currentState.i);

        if((userChoice === sequence[game.currentState.i]) && (game.currentState.i === (game.currentState.sequence.length - 1))){

            if(game.currentState.sequence.length === 10){
                game.currentState.setStatus('end');
                console.log('You Win');
            }

            else {
                var next = new State(game.currentState);
                
                next.advanceTurn();
                next.setStatus('running');
                next.resetItr();
                game.advanceTo(next);
            }
        }

        else if (userChoice === sequence[game.currentState.i]) {
            game.currentState.iterate();
        }
        else {
            game.currentState.setStatus('end');
            console.log('You Lose');

        }
    }

})


});
