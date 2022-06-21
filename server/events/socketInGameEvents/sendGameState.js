module.exports = (io, socket, game) => {
    return () =>
        io
            .in(game.id)
            .emit("gameState", { board: game.board, moves : game.moves, nextTurn: game[game.nextTurn], winner: game[game.winner], time: Date.now() });
};
