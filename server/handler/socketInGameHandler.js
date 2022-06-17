module.exports = (io, socket) => {

    return (game) => {

        //get player 

        const onLeaveGame = require("../events/socketInGameEvents/onLeaveGame")(io, socket, game, "player");

        //socket join room

        socket.on("disconnect", onLeaveGame);

    };
};
