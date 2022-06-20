module.exports = (io, socket, game) => {
    return (player) => {

        io
            .in(game.id)
            .emit("playerLeave", {player: player, time: Date.now() });
    };
};
