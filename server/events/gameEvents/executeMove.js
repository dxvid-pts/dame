const checkers = require("shared/checkers");

module.exports = (game, move) => {
    const player_number = game.nextTurn == "playerone" ? 1 : -1;

    if (checkers.tileInBounds(move.from) && checkers.tileInBounds(move.to)) {
        if (player_number * checkers.getField(game.board, move.from) > 0) {
            if (checkers.tileCanMoveTo(game.board, move.from, move.to)) {
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
                game.board = checkers.tileJumpTo(
                    game.board,
                    move.from,
                    move.to
                );
                game.moves.push({ player: game.nextTurn, move: move });
                game.nextTurn =
                    game.nextTurn == "playerone" ? "playertwo" : "playerone";
                return true;
                //Handle dopple move wenn man nochmal schlagen kann!!!!!
            }
        }
    }
    return false;
};
