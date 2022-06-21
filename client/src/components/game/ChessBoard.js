import {useState} from "react";
import mixColors from "../../utils";
import Char from "./char/Char.js";


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

export function PlayerTile() {
    return <img alt={"self-Logo"} src={Constants.PLAYER_SVG} style={{
        width: tileSize,
        height: tileSize,
    }}></img>;
}

export function ChessBoardTile(props) {
    const [isShown, setIsShown] = useState(false);

    //set grid colors
    let white = (props.row % 2 === 0);

    if (props.column % 2 === 0) {
        white = !white;
    }
    let tileColor = white ? Constants.COLOR_CHESSBOARD_EVEN : Constants.COLOR_CHESSBOARD_ODD;

    if (isShown) {
        tileColor = mixColors(tileColor, '#B5FDA4');
    }

    var p = null;
    test={props.char}
    if (props.column === 0 || props.column === 1) {
        p = <PlayerTile></PlayerTile>;
    }

    return <div
        onMouseEnter={() => setIsShown(true)}
        onMouseLeave={() => setIsShown(false)}
        style={{
            width: tileSize,
            height: tileSize,
            backgroundColor: tileColor,
        }}>
        {p}
    </div>;
}

export function ChessRow(props) {
    const tiles = [];
    const chars = props.chars;
    for (let i = 0; i < Constants.BOARD_SIZE; i++) {
        tiles.push(<ChessBoardTile char={chars[i]} column={props[i].column} row={i} key={props[i].column + "" + i}></ChessBoardTile>);
    }

    return <div style={{display: "flex"}}>{tiles}</div>;
}

export default function ChessBoard() {
    const rows = [];
    const props = [
        [1, 0, 1, 0, 1, 0, 1, 0],
        [0, 1, 0, 1, 0, 1, 0, 1],
        [1, 0, 1, 0, 1, 0, 1, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, -1, 0, -1, 0, -1, 0, -1],
        [-1, 0, -1, 0, -1, 0, -1, 0],
        [0, -1, 0, -1, 0, -1, 0, -1],
    ];
    for (let i = 0; i < Constants.BOARD_SIZE; i++) {
        //use index as id key
        rows.push(<ChessRow chars={props[i]} column={i} key={i}></ChessRow>);
    }
    return <div>{rows}</div>;
}