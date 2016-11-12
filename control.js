/**
 * Created by christopherli on 11/4/16.
 */
var globals = {};

globals.game = new Game();
var ai = new AI();
ai.plays(globals.game);

globals.game.aiPlayer(ai);

$(document).ready(function(){

    $('#start').click(function(){
        globals.game.currentState.setGameMode('norm');
        globals.game.start();
    });

    $('#strict').click(function(){
        globals.game.currentState.setGameMode('strict');
        globals.game.start();
    });

    $('.cell').click(function(){

        if(!globals.game.currentState.getLock()){

            var sequence = globals.game.currentState.getSequence(),
                i = globals.game.currentState.getI(),
                gameMode = globals.game.currentState.getGameMode(),

                userChoice = $(this).data('indx');

            console.log(sequence);

            //light up userChoice div
            $(this).addClass('light').delay(500).queue(function(){
                $(this).removeClass('light').dequeue();
            });

            //play sound of userChoice
            ui.playSound(parseInt(userChoice));

            //if choice is correct and i is at the end of the current array.
            if(userChoice === sequence[i] && (i === (sequence.length - 1))){

                //if sequence length is 20, user wins.
                if(sequence.length === 20){
                    console.log('winner');
                }
                // else AI adds a move to the sequence and the game advances
                else {

                    globals.game.currentState.setLock(true);

                    var next = new State(globals.game.currentState);

                    next.setLock(true);
                    next.advanceTurn();
                    next.resetItr();

                    setTimeout(function(){
                        globals.game.advanceTo(next);
                    }, 1000);
                }
            }

            //if choice is correct but i is not at the end, iterate i.
            else if(userChoice === sequence[i]){

                globals.game.currentState.iterate();
            }

            //if choice is incorrect
            else {

                //incorrect and normal mode, repeat current sequence after a timeout
                if(gameMode === 'norm'){

                    globals.game.currentState.setLock(true);
                    globals.game.currentState.resetItr();

                    setTimeout(function(){
                        globals.game.advanceTo(globals.game.currentState);
                    }, 1000);

                }
                //incorrect and strict mode, start a new game
                else if(gameMode === 'strict'){

                    globals.game.currentState.setLock(true);

                    setTimeout(function(){
                        var newGame = new State();
                        newGame.setGameMode('strict');
                        globals.game.advanceTo(newGame);
                    }, 1000)
                }
            }
        }
    })
});