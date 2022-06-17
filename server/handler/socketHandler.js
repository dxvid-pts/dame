module.exports =  (io, socket) => {

    const joinGame = require("../socketEvents/onJoinGame")(io, socket);
    const createGame = require("../socketEvents/onCreateGame")(io, socket);
    const disconnect = require("../socketEvents/onDisconnect")(io, socket);


    console.log("Player " + socket.id + " connected");

    socket.on("joinGame", joinGame);
    socket.on("createGame", createGame);
    socket.on("disconnect", disconnect);
}