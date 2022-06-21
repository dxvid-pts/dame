module.exports =  (io, socket, gameHandler) => {

    const joinGame = require("../events/socketEvents/onJoinGame")(io, socket, gameHandler);
    const createGame = require("../events/socketEvents/onCreateGame")(io, socket, gameHandler);
    const spectateGame = require("../events/socketEvents/onSpectateGame")(io, socket, gameHandler);
    const disconnect = require("../events/socketEvents/onDisconnect")(io, socket);


    io.to(socket.id).emit("socketid", socket.id);

    console.log("Player " + socket.id + " connected");

    socket.on("joinGame", joinGame);
    socket.on("createGame", createGame);
    socket.on("spectateGame", spectateGame);
    socket.on("disconnect", disconnect);
}