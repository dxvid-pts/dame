module.exports =  (io, socket) => {

    const joinGame = require("../events/socketEvents/onJoinGame")(io, socket);
    const createGame = require("../events/socketEvents/onCreateGame")(io, socket);
    const disconnect = require("../events/socketEvents/onDisconnect")(io, socket);


    console.log("Player " + socket.id + " connected");

    socket.on("joinGame", joinGame);
    socket.on("createGame", createGame);
    socket.on("disconnect", disconnect);
}