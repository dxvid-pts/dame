module.exports =  (io, socket) => {

    const joinGame = require("../userEvents/onJoinGame")(io, socket);
    const createGame = require("../userEvents/onCreateGame")(io, socket);
    
    console.log("Player " + socket.id + " connected");

    socket.on("joinGame", joinGame);
    socket.on("createGame", createGame);
    
}