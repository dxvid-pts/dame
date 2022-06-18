module.exports = (io, socket, gameHandler) => {
    const inGameHandler = require("../../handler/socketInGameHandler")(io, socket, gameHandler);
    const isValidObject = require("../../utils/isValidObject.js");
    const reportError = require("./sendError")(io, socket);
    const createGame = require("../gameEvents/createGame");

    return (args) => {
        if (isValidObject(args, ["nick", "visible", "guests"])) {
            if (gameHandler.getGameBySocketID(socket.id) == null) {
                game = createGame(
                    { socketid: socket.id, nick: args.nick},
                    args.visible,
                    args.guests
                );
                gameHandler.addNewGame(game);
                
                console.log("Player " + socket.id + " created Game " + game.id);

                inGameHandler(game);
                
            } else {
                reportError(
                    21,
                    "Cannot create Game. Your are already in a Game."
                );
            }
        }
    };
};
