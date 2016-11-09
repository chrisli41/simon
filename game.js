/**
 * Created by christopherli on 11/4/16.
 */

var State = function(prev){

    this.turn = '';
    this.status = '';
    this.i = 0;
    this.sequence = [];

    if(typeof prev !== 'undefined'){
        this.turn = prev.turn;
        this.sequence = prev.sequence;
    }

    this.advanceTurn = function(){
        this.turn = this.turn === 'ai' ? 'human' : 'ai';
    };

    this.addSequence = function(_move){
        this.sequence.push(_move);
    };

    this.iterate = function(){
        this.i++;
    };

    this.resetItr = function(){
        this.i = 0;
    }
    
    this.setStatus = function(_status){
        this.status = _status;
    }
    
};

var Game = function(){

    var ai = {};

    this.currentState = new State();
    this.currentState.status = 'running';
    this.currentState.turn = 'ai';

    this.advanceTo = function(_state){
        this.currentState = _state;

        if(this.currentState.turn == 'ai') {
            console.log('ai - turn');
            ai.makeMove();
        }
        else {
            ui.showSequence();
            console.log('human - turn');
        }
    };

    this.start = function(){
        this.advanceTo(this.currentState);
        console.log(this.currentState.sequence);
    };

    this.aiPlayer = function(_ai){
        ai = _ai;
    }

};

var AI = function(){

    var game = {};

    this.makeMove = function() {
        
        var random = Math.floor(Math.random() * 4);
        var next = new State(game.currentState);

        next.addSequence(random);
        next.setStatus('displaying');
        next.advanceTurn();
        
        game.advanceTo(next);
    };

    this.plays = function(_game) {
        game = _game;
    }
};