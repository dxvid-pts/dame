module.exports = (io, socket, game) => {
    return (msg, player) =>
        io
            .in(game.id)
            .emit("msg", { msg: msg, player: player, time: Date.now()});
};
