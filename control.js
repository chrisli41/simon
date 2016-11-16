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
        if(!globals.game.currentState.getLock()){

            var newGame = new State();
            newGame.setGameMode('norm');

            globals.game.advanceTo(newGame);

        }
    });

    $('#strict').click(function(){
        if(!globals.game.currentState.getLock()){

            var newGame = new State();
            newGame.setGameMode('strict');

            globals.game.advanceTo(newGame);
        }
    });

    $('.quarter').click(function(){

        if(!globals.game.currentState.getLock() && globals.game.currentState.getGameMode() !== ''){

            var sequence = globals.game.currentState.getSequence(),
                gameMode = globals.game.currentState.getGameMode(),
                i = globals.game.currentState.getI(),

                userChoice = $(this).data('indx');

            console.log(sequence);

            //light up userChoice div
            
            ui.playSound(parseInt(userChoice));

            //if choice is correct and i is at the end of the current array.
            if(userChoice === sequence[i] && (i === (sequence.length - 1))){

                //if sequence length is 20, user wins.
                if(sequence.length === 10){
                    globals.game.currentState.setLock(true);
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