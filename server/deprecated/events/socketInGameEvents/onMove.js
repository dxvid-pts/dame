module.exports = (io, socket, game, iam) => {
    const sendGameState = require("./sendGameState")(io, socket, game);
    const sendError = require("../socketEvents/sendError")(io, socket);
    const isValidObject = require("../../utils/isValidObject");
    const executeMove = require("../gameEvents/executeMove");
    const checkers = require("shared/checkers");

    return (args) => {
        if (
            isValidObject(args, ["move"]) &&
            isValidObject(args.move, ["from", "to"])
        ) {
            if (
                isValidObject(args.move.from, ["x", "y"]) &&
                isValidObject(args.move.to, ["x", "y"])
            ) {
                if (game.nextTurn == iam) {
                    if (executeMove(game, args.move)) {
                        winner = checkers.gameIsFinished(game.board);
                        if (winner != 0) {
                            game.nextTurn = null;
                            if (winner != 2) {
                                game.winner =
                                    1 == winner ? "playerone" : "playertwo";
                            }
                        }
                        sendGameState();
                    } else {
                        sendError(41, "Cannot move. This is not allowed.");
                    }
                } else {
                    sendError(40, "Cannot move. It is not your turn.");
                }
            }
        }
    };
};
