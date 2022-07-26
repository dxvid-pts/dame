module.exports = (io, socket, game) => {
    return (msg) =>
        io
            .in(game.id)
            .emit("log", { msg: msg, time: Date.now()});
};
