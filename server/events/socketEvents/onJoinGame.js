module.exports = (io, socket, gameHandler) => {
    const inGameHandler = require("../../handler/socketInGameHandler")(io, socket, gameHandler);
    const isValidObject = require("../../utils/isValidObject.js");
    const reportError = require("./sendError")(io, socket);
    const joinGame = require("../gameEvents/joinGame");

    return (args) => {
        if (isValidObject(args, ["nick", "gameid"])) {
            if (gameHandler.getGameBySocketID(socket.id) == null) {
                game = gameHandler.getGameByID(args.gameid);
                if (game != null) {
                    if (
                        joinGame(game, {
                            socketid: socket.id,
                            nick: args.nick
                        })
                    ) {
                        console.log(
                            "Player " +
                                socket.id +
                                " joined Game " +
                                args.gameid
                        );
                        inGameHandler(game);
                        
                    } else {
                        reportError(
                            14,
                            "Cannot join Game. Game " +
                                args.gameid +
                                "  is full."
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
