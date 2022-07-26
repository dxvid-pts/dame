module.exports = (io, socket, gameHandler) => {
    const isValidObject = require("../../utils/isValidObject.js");
    const reportError = require("./sendError")(io, socket);

    return (args) => {
        if (!isValidObject(args, ["gameid"])) {
            return;
        }

        game = gameHandler.getGameByID(args.gameid);

        if (game == null) {
            reportError(
                13,
                "Cannot join Game. Game " + args.gameid + " does not exist."
            );
            return;
        }
        
        if (!game.visible) {
            reportError(
                13,
                "Cannot spectate Game. Game " + args.gameid + " is private."
            );
            return;
        }

        socket.join(game.id);
    };
};
