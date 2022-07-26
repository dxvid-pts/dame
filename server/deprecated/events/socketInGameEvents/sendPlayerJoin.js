module.exports = (io, socket, game) => {
    return (player) => {

        io
            .in(game.id)
            .emit("playerJoin", {game: game.id, player: player, time: Date.now() });
    };
};
