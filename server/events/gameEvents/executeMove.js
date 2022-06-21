const checkers = require("shared/checkers");

module.exports = (game, move) => {
    const player_number = game.nextTurn == "playerone" ? 1 : -1;

    if (checkers.tileInBounds(move.from) && checkers.tileInBounds(move.to)) {
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
                game.moves.push({ player: game.nextTurn, move: move });
                game.nextTurn =
                    game.nextTurn == "playerone" ? "playertwo" : "playerone";
                return true;
            } else if (checkers.tileCanJumpTo(game.board, move.from, move.to)) {
                if(game.nextTurnFrom != null){
                    if(move.from.x != game.nextTurnFrom.x || move.from.y != game.nextTurnFrom.y){
                        return false;
                    }
                }
                game.board = checkers.tileJumpTo(
                    game.board,
                    move.from,
                    move.to
                );
                game.moves.push({ player: game.nextTurn, move: move });

                if (checkers.tileCanJump(game.board, move.to)) {
                    game.nextTurnFrom = move.to;
                
                } else {
                    game.nextTurnFrom = null;
                    game.nextTurn =
                        game.nextTurn == "playerone"
                            ? "playertwo"
                            : "playerone";
                }

                return true;
            }
        }
    }
    return false;
};
