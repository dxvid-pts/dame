module.exports = (io, socket) => {

    const whichPlayer = require("../utils/whichPlayer");

    return (game) => {

        const iam = whichPlayer(game, socket.id);

        const onLeaveGame = require("../events/socketInGameEvents/onLeaveGame")(io, socket, game, game[iam]);
        const sendLog = require("../events/socketInGameEvents/sendLog")(io, socket, game);
        const sendJoinConfirmation = require("../events/socketInGameEvents/sendJoinConfirmation")(io, socket, game);

        socket.join(game.id);
        
        sendJoinConfirmation();

        sendLog("Player " + game[iam].nick + " joined");

        if(game.playerone != null && game.playertwo != null){
            //trigger game start event
        }else{
            sendLog("Waiting for Enemy to join.");
        }



        socket.on("disconnect", onLeaveGame);

    };
};
