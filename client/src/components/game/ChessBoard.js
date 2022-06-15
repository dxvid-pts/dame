const Constants = require("shared/constants");

const tileSize = 80;

//returns [0, 1, 2, 3, ..., n] until board_size is reached
function generateRow() {
    return Array.from(Array(Constants.BOARD_SIZE).keys());
}

//saved chessboard state
const chessboard = new Map();

//initializes chessboard with empty fields
function initiateChessBoard() {
    //already initialized -> return;
    if (chessboard.size > 0) {
        return;
    }

    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    for (let i = 0; i < Constants.BOARD_SIZE; i++) {
        chessboard.set(alphabet.charAt(i), generateRow());
    }

    console.log(chessboard);
}

//create columns & rows in chessboard
initiateChessBoard();

export function ChessBoardTile(props) {
    //set grid colors
    let white = (props.row % 2 === 0);
    if (props.column % 2 === 0) {
        white = !white;
    }

    return <div style={{
        width: tileSize,
        height: tileSize,
        backgroundColor: white ? Constants.COLOR_CHESSBOARD_EVEN : Constants.COLOR_CHESSBOARD_ODD
    }}></div>;
}

export function ChessRow(props) {
    const tiles = [];
    for (let i = 0; i < Constants.BOARD_SIZE; i++) {
        tiles.push(<ChessBoardTile column={props.column} row={i}></ChessBoardTile>);
    }
    return <div style={{display: "flex"}}>{tiles}</div>;
}

export default function ChessBoard() {
    const rows = [];
    for (let i = 0; i < Constants.BOARD_SIZE; i++) {
        rows.push(<ChessRow column={i}></ChessRow>);
    }
    return <div>{rows}</div>;
}