/**
 * Created by christopherli on 11/4/16.
 */
var ui = {};

ui.show = function(){
    console.log(globals.game.currentState.sequence)
};

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
};