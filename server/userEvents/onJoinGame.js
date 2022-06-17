module.exports = (io, socket) => {
    const gameHandler = require("../handler/gameHandler")();
    const isValidObject = require("../utils/isValidObject.js");
    const reportError = require("./sendError")(io, socket);
    const joinGame = require("../gameEvents/joinGame");

    return (args) => {
        if (isValidObject(args, ["nick", "gameid"])) {
            if (gameHandler.getGameByPlayerID(socket.id) == null) {
                game = gameHandler.getGameByID(args.gameid);
                if (game != null) {
                    if (
                        joinGame(game, {
                            id: socket.id,
                            nick: args.nick,
                        })
                    ) {
                        console.log(
                            "Player " +
                                socket.id +
                                " joined Game " +
                                args.gameid
                        );

                        //handle game
                        
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
