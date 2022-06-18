module.exports = (io, socket, game, iam) => {
    const sendError = require("../socketEvents/sendError")(io, socket);
    const isValidObject = require("../../utils/isValidObject");
    const checkers = require("shared/checkers");

    return (args) => {
        if (isValidObject(args, "move") && (isValidObject(args.move, ["from", "to"])) {
            if (
                isValidObject(args.move.from, ["x", "y"]) &&
                isValidObject(args.move.to, ["x", "y"])
            ) {
                if (game.nextTurn == iam) {
                    if(checkers.moveIsAllowed(game.board, iam == "playerone" ? 1 : -1, args.move)){
                        
                    }
                } else {
                    sendError(40, "Cannot move. It is not your turn.");
                }
            }
        }
    };
};
