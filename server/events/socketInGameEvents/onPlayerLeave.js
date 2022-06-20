module.exports = (io, socket, game, iam, gameHandler) => {

    const leaveGame = require("../gameEvents/leaveGame");
    const sendPlayerLeave = require("./sendPlayerLeave")(io, socket, game);
    
    return () => {
        sendPlayerLeave(game[iam]);
        socket.leave(game.id);
        console.log("Player "+socket.id+" left Game "+game.id);
        leaveGame(game, iam, gameHandler);

        //vll unnötig später anpassen dann MÜSSEN listener entfernt werden !!!!!s
        socket.disconnect(0);
    };
};
