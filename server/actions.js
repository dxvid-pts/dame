function initPlayer(io, socket, game){

    console.log(game);
    socket.join(game.id);
    socket.on("message", (msg) => {
        io.in(gameid).emit("message", {sender: socket.id});
    });



    socket.on("leavegame", () => {
        //handle gewollten game leave
    });

    socket.on('disconnect', () => {
        //handle game leave on browser exit
        console.log('user disconnected');
      });
}

function reportError(io, socket, code, msg){
    io.to(socket.id).emit("error", {code: code, msg: msg});
}

module.exports = {initPlayer, reportError};