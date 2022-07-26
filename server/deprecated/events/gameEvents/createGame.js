const Constants = require("shared/constants");

module.exports = (player, visible, guests) => {
    const id = (openGames.toString() + Math.floor(Math.random() * 10000))
        .substring(0, 5)
        .toString();


    return {
        id: id,
        board: Constants.INITIAL_BOARD,
        playerone: player,
        playertwo: null,
        moves: [],
        nextTurn: null,
        visible: visible,
        guests: guests,
        winner: null,
        nextTurnFrom: null,
    };
};
