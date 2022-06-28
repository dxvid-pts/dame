module.exports = (io, socket, gameHandler) => {
    const isValidObject = require("../../utils/isValidObject.js");
    const reportError = require("./sendError")(io, socket);

    return (args) => {
        if (isValidObject(args, ["gameid"])) {
            if (gameHandler.getGameBySocketID(socket.id) == null) {
                game = gameHandler.getGameByID(args.gameid);
                if (game != null) {
                    if (game.visible) {
                        socket.join(game.id);
                    } else {
                        reportError(
                            13,
                            "Cannot spectate Game. Game " +
                                args.gameid +
                                " is private."
                        );
                    }
                } else {
                    reportError(
                        13,
                        "Cannot join Game. Game " +
                            args.gameid +
                            " does not exist."
                    );
                }
            } else {
                reportError(
                    12,
                    "Cannot join Game. Your are already in a Game."
                );
            }
        }
    };
};
