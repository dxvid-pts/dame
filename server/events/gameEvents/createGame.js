module.exports = (player, visible, guests) => {
    const id = (openGames.toString() + Math.floor(Math.random() * 10000))
        .substring(0, 5)
        .toString();

    return {
        id: id,
        board: [
            [1, 0, 1, 0, 1, 0, 1, 0],
            [0, 1, 0, 1, 0, 1, 0, 1],
            [1, 0, 1, 0, 1, 0, 1, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, -1, 0, -1, 0, -1, 0, -1],
            [-1, 0, -1, 0, -1, 0, -1, 0],
            [0, -1, 0, -1, 0, -1, 0, -1],
        ],
        playerone: player,
        playertwo: null,
        moves: [],
        nextTurn: null,
        visible: visible,
        guests: guests,
    };
};
