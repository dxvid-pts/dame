const constants = {
    CONNECTION_PORT: 4000,
    BOARD_SIZE: 8,
    COLOR_CHESSBOARD_EVEN: "#FFFF00",
    COLOR_CHESSBOARD_ODD: "#0000FF",
    PLAYER_SVG_WHITE: require('../client/public/player_white.svg'),
    PLAYER_SVG_BLACK: require('../client/public/player_black.svg'),
    BOARD_WHITE: require('../client/public/board_white.jpeg'),
    BOARD_BLACK: require('../client/public/board_black.png'),
    INITIAL_BOARD: [
        [1, 0, 1, 0, 1, 0, 1, 0],
        [0, 1, 0, 1, 0, 1, 0, 1],
        [1, 0, 1, 0, 1, 0, 1, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, -1, 0, -1, 0, -1, 0, -1],
        [-1, 0, -1, 0, -1, 0, -1, 0],
        [0, -1, 0, -1, 0, -1, 0, -1],
    ]
}

module.exports = constants