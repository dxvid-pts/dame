module.exports = (io, socket) => {
    const handler = require("../handler/gameHandler");
    const actions = require("../actions");
    const isValidObject = require("../utils/isValidObject.js");
    const reportError = require("./reportError")(io, socket);


    return (args) => {
        if (isValidObject(args, ["nick", "visible", "guests"])) {
            if (!handler.isPlayerIngame(socket.id)) {
                game = handler.createGame(
                    { id: socket.id, nick: args.nick },
                    args.visible,
                    args.guests
                );
                console.log("Player " + socket.id + " created Game " + game.id);
                actions.initPlayer(io, socket, game);
            } else {
                reportError(
                    3,
                    "Cannot create Game. Your are ingame."
                );
            }
        }
    };
};
