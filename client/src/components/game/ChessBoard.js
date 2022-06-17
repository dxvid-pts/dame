import {useState} from "react";
import { COLOR_CHESSBOARD_EVEN } from "shared/constants";
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

export function ChessBoardTile(props) {
    const [isShown, setIsShown] = useState(false);
    let player;
    //set grid colors
    let white = (props.row % 2 === 0);
    
    if (props.column % 2 === 0) {
        white = !white;
    }
    let tileColor = white ? Constants.COLOR_CHESSBOARD_EVEN : Constants.COLOR_CHESSBOARD_ODD;

    if (isShown) {
        tileColor = mixColors(tileColor, '#B5FDA4');
    }
    const blue = {player: "blue"};
    return (
        <div
            onMouseEnter={() => setIsShown(true)}
            onMouseLeave={() => setIsShown(false)}
            style={{
                width: tileSize,
                height: tileSize,
                backgroundColor: tileColor,
            }}>
                <Char test={props.char}></Char>
            </div>
    );
}

export function ChessRow(props) {
    const tiles = [];
    if(props.initiateChessBoard)
    for (let i = 0; i < Constants.BOARD_SIZE; i++) {
        //use coordinate as id (column/row)
        tiles.push(<ChessBoardTile char={char} column={props.column} row={i} key={props.column + "" + i}></ChessBoardTile>);
    }
    return <div style={{display: "flex"}}>{tiles}</div>;
}


export default function ChessBoard() {
    const rows = [];
    for (let i = 0; i < Constants.BOARD_SIZE; i++) {
        //use index as id key
        rows.push(<ChessRow column={i} key={i}></ChessRow>);
    }
    return <div>{rows}</div>;
}