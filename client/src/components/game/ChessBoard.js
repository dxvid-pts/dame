import {createContext, useState} from "react";
import mixColors from "../../utils";

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

export function PlayerTile(props) {
    return <img alt={"self-Logo"} src={props.img} style={{
        width: tileSize,
        height: tileSize,
        "pointer-events": "none",
        "user-select": "none"
    }}></img>;
}

const initialGlobalState = {
    highlightedFields: [{column: 0, row: 0}],
};

const globalStateContext = createContext(initialGlobalState);

export function ChessBoardTile(props) {
    const [isHovered, setIsHovered] = useState(false);

    //set grid colors
    let white = (props.row % 2 === 0);

    if (props.column % 2 === 0) {
        white = !white;
    }
    let tileColor = white ? Constants.COLOR_CHESSBOARD_EVEN : Constants.COLOR_CHESSBOARD_ODD;

    if (isHovered) {
        tileColor = mixColors(tileColor, '#B5FDA4');
    }

    //render highlighted fields
    for (let position of props.globalState.highlightedFields) {
        console.log(position);
        if (position.row === props.row && position.column === props.column) {
            tileColor = mixColors(tileColor, '#FF0000');
        }
    }

    let p = null;
    switch (props.char) {
        case -1:
            p = <PlayerTile img={Constants.PLAYER_SVG_WHITE}></PlayerTile>;
            break;
        case 1:
            p = <PlayerTile img={Constants.PLAYER_SVG_BLACK}></PlayerTile>;
            break;
    }

    return <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => props.onClick({row: props.row, column: props.column})}
        style={{
            width: tileSize,
            height: tileSize,
            backgroundColor: tileColor,
        }}>
        {p}
    </div>;
}

export function ChessRow(props) {
    //const [user, setUser] = useState(false);

    const tiles = [];
    for (let i = 0; i < Constants.BOARD_SIZE; i++) {
        tiles.push(<ChessBoardTile char={props.chars[i]} column={props.column} row={i} onClick={props.onClick}
                                   globalState={props.globalState}
                                   key={props.column + "" + i}></ChessBoardTile>);
    }

    return <div style={{display: "flex"}}>{tiles}</div>;
}

export default function ChessBoard() {
    //  const [user, setUser] = useState(false);
    const [globalState, setGlobalState] = useState(initialGlobalState);

    const rows = [];

    //TODO: replace with server code
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
        rows.push(<ChessRow chars={props[i]} column={i} key={i} onClick={(selectedField) => {

            //TODO: PHILIPP: state logic here
            //highlighted fields are stored inside an array in the global state.
            //fields are objects {row: 0, column: 0}
            setGlobalState({
                highlightedFields: [{
                    row: selectedField.row - 1,
                    column: selectedField.column - 1
                }, {row: selectedField.row + 1, column: selectedField.column - 1},],
            });
        }

        } globalState={globalState}></ChessRow>);
    }
    return <globalStateContext.Provider value={globalState}>
        <div>{rows}</div>
    </globalStateContext.Provider>;
}
