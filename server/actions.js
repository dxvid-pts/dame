function initPlayer(io, socket, game){

    socket.join(game.id);

    if(socket.id == game.playerone.id){
        var me = game.playerone;
        var enemy = game.playertwo;
    }else{
        var me = game.playertwo;
        var enemy = game.playerone;
    }


    socket.on("message", (args) => {
        io.in(game.id).emit("message", {sender: me.nick, msg: args.msg, time: Date.now()});
    });



    socket.on("leavegame", () => {
        //handle gewollten game leave
    });

    socket.on('disconnect', () => {
        //handle game leave on browser exit
        console.log('user disconnected');
      });
}

module.exports = {initPlayer};