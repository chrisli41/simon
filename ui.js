/**
 * Created by christopherli on 11/4/16.
 */
var ui = {};

ui.showSequence = function(){
    var sequence = globals.game.currentState.sequence;

    var i = 0, howManyTimes = sequence.length;
    function f() {
        console.log(sequence[i]);
        i++;
        if( i < howManyTimes ){
            setTimeout(f, 2000);
        }
    }
    f();
    
    globals.game.currentState.setStatus('input');
    
};

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