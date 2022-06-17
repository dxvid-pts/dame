module.exports = (io, socket) => {
    const handler = require("../handler/gameHandler");
    const actions = require("../actions");
    const isValidObject = require("../utils/isValidObject.js");
    const reportError = require("./reportError")(io, socket);

    return (args) => {
        if (isValidObject(args, ["nick", "gameid"])) {
            if (handler.gameExists(args.gameid)) {
                if (!handler.isPlayerIngame(socket.id)) {
                    if (
                        handler.joinGame(
                            { id: socket.id, nick: args.nick },
                            args.gameid
                        )
                    ) {
                        console.log(
                            "Player " +
                                socket.id +
                                " joined Game " +
                                args.gameid
                        );
                        actions.initPlayer(
                            io,
                            socket,
                            handler.getGameByID(args.gameid)
                        );
                    } else {
                        reportError(
                            1,
                            "Cannot join. Game " + args.gameid + "  is full."
                        );
                    }
                }
            } else {
                reportError(
                    2,
                    "Cannot join. Game " + args.gameid + " does not exist."
                );
            }
        }
    };
};
