/**
 * Created by christopherli on 11/4/16.
 */
var State = function(prev){

    var lock = false,
        turn = 'ai',
        sequence = [],
        i = 0,
        gameMode = '',
        end = false;

    if(typeof prev !== 'undefined'){
        lock = prev.getLock();
        turn = prev.getTurn();
        sequence = prev.getSequence();
        i = 0;
        gameMode = prev.getGameMode();
    }

    this.getLock = function(){
        return lock;
    };

    this.setLock = function(_lock){
        lock = _lock
    };

    this.getTurn = function(){
        return turn;
    };

    this.advanceTurn = function(){
        turn = turn === 'ai' ? 'human' : 'ai';
    };

    this.getSequence = function(){
        return sequence;
    };

    this.addSequence = function(_itemToAdd){
        sequence.push(_itemToAdd);
    };

    this.iterate = function(){
        i++;
    };

    this.resetItr = function(){
        i = 0;
    };

    this.getI = function(){
        return i;
    };

    this.getGameMode = function(){
        return gameMode;
    };

    this.setGameMode = function(_gameMode){
        gameMode = _gameMode;
    };
    
    this.getEnd = function(){
        return end;
    };
    
    this.setEnd = function(_end){
        end = _end;
    }
};

var Game = function(){

    var ai = {};
    var that = this;

    this.currentState = new State();

    this.advanceTo = function(_state){
        this.currentState = _state;

        if(this.currentState.getTurn() === 'ai'){
            ai.makeMove();
        }
        else {
            ui.showSequence().then(function(){
                that.currentState.setLock(false);
            });
        }
    };

    this.start = function(){
        this.advanceTo(this.currentState);
    };

    this.aiPlayer = function(_ai){
        ai = _ai;
    }
};

var AI = function(){

    var game = {};

    this.makeMove = function(){

        var randomChoice = Math.floor(Math.random() * 4);
        var next = new State(game.currentState);

        next.addSequence(randomChoice);
        next.advanceTurn();

        game.advanceTo(next);

    };

    this.plays = function(_game){
        game = _game;
    }
};