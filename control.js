/**
 * Created by christopherli on 11/4/16.
 */

var globals = {};

$(document).ready(function(){

    var i = 0;

    $('#start').click(function(){

        if(!globals.game) {
            globals.game = new Game();
            var ai = new AI();

            ai.plays(globals.game);
            globals.game.aiPlayer(ai);

            globals.game.start();
        }
    });

$('.cell').click(function(){

    var game = globals.game;

    if(game && game.currentState.turn === 'human') {
        var sequence = game.currentState.sequence;
        var userChoice = $(this).data('indx');

        console.log('userChoice: ' + userChoice +  ' seq val: ' + sequence[game.currentState.i] + ' i: ' + game.currentState.i);
        console.log(sequence);

        if((userChoice === sequence[game.currentState.i]) && (game.currentState.i === (game.currentState.sequence.length - 1))){
            console.log('correct');

            if(game.currentState.sequence.length === 10){
                console.log('You Win');
            }

            else {

                var next = new State(game.currentState);

                next.advanceTurn();
                next.resetItr();

                game.advanceTo(next);
            }
        }

        else if (userChoice === sequence[game.currentState.i]) {
            console.log('correct');
            game.currentState.iterate();
        }
        else {
            console.log('You Lose');

        }
    }

})


});
