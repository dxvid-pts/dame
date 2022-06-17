module.exports = (io, socket, game, player) => {

    const leaveGame = require("../gameEvents/leaveGame");

    return (args) => {

        //emit message to room
        leaveGame(game, player);
    };
};
