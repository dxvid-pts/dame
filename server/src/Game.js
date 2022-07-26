class Game{
    constructor(id, spectatable, searching) {
        this.id = id;
        this.spectatable = spectatable;
        this.searching = searching;
        
        this.board = [
            [1, 0, 1, 0, 1, 0, 1, 0],
            [0, 1, 0, 1, 0, 1, 0, 1],
            [1, 0, 1, 0, 1, 0, 1, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, -1, 0, -1, 0, -1, 0, -1],
            [-1, 0, -1, 0, -1, 0, -1, 0],
            [0, -1, 0, -1, 0, -1, 0, -1],
        ];
        this.moves = [];

        this.player = null;
        this.winner = null;

        this.nextTurnPlayer = null;
        this.nextPossibleTurns = null;
    }

    join(player) {
        if (this.player === null) {
            this.player = player;
        }
    }

    leave(player) {
        if (this.player === player) {
            this.player = null;
        }
    }

    isFinished(){

    }

    isFull(){
        return this.player !== null;
    }

    isEmpty(){
        return this.player === null;
    }
}

class TwoPlayerGame extends Game{
    constructor(id, spectatable, searching) {
        super(id, spectatable, searching);
        this.enemy = null;
    }

    start(){
        this.nextTurnPlayer = Math.random() < 0.5 ? this.player : this.enemy;
    }

    // DEPRECATED
    turn(move) {
        const player_number = game.nextTurnPlayer == "playerone" ? 1 : -1;

        if (
            checkers.tileInBounds(move.from) &&
            checkers.tileInBounds(move.to)
        ) {
            if (player_number * checkers.getField(game.board, move.from) > 0) {
                if (
                    !checkers.playerCanJump(game.board, player_number) &&
                    checkers.tileCanMoveTo(game.board, move.from, move.to)
                ) {
                    game.board = checkers.tileMoveTo(
                        game.board,
                        move.from,
                        move.to
                    );
                    game.moves.push({ player: game.nextTurnPlayer, move: move });
                    game.nextTurnPlayer =
                        game.nextTurnPlayer == "playerone"
                            ? "playertwo"
                            : "playerone";
                    return true;
                } else if (
                    checkers.tileCanJumpTo(game.board, move.from, move.to)
                ) {
                    if (game.nextTurnPlayerFrom != null) {
                        if (
                            move.from.x != game.nextTurnPlayerFrom.x ||
                            move.from.y != game.nextTurnPlayerFrom.y
                        ) {
                            return false;
                        }
                    }
                    game.board = checkers.tileJumpTo(
                        game.board,
                        move.from,
                        move.to
                    );
                    game.moves.push({ player: game.nextTurnPlayer, move: move });

                    if (checkers.tileCanJump(game.board, move.to)) {
                        game.nextTurnPlayerFrom = move.to;
                    } else {
                        game.nextTurnPlayerFrom = null;
                        game.nextTurnPlayer =
                            game.nextTurnPlayer == "playerone"
                                ? "playertwo"
                                : "playerone";
                    }

                    return true;
                }
            }
        }
        return false;
    }

    join(player) {
        if (this.enemy === null) {
            this.enemy = player;
        }else{
            super.join(player);
        }
    }

    leave(player) {
        if (this.enemy === player) {
            this.enemy = null;
        }else{
            super.leave(player);
        }
    }

    isFinished(){

    }

    isFull(){
        return (super.isFull() && this.enemy !== null);
    }

    isEmpty(){
        return (super.isEmpty() && this.enemy === null);
    }
}

class OnePlayerGame extends Game{
    constructor(id, spectatable, difficulty) {
        super(id, spectatable, false);
        this.difficulty = difficulty;
    }
}

module.exports = {TwoPlayerGame, OnePlayerGame};
