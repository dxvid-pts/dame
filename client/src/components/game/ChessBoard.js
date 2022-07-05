import {createContext, useState} from "react";
import mixColors from "../../utils";

const Constants = require("shared/constants");

const tileSize = 80;

//returns [0, 1, 2, 3, ..., n] until board_size is reached
function generateRow() {
    return Array.from(Array(Constants.BOARD_SIZE).keys());
}


export function PlayerTile(props) {
    return <img alt={"self-Logo"} src={props.img} style={{
        width: tileSize,
        height: tileSize,
        "pointer-events": "none",
        "user-select": "none"
    }}></img>;
}

const initialGlobalState = {
    selectedTile: null,
    highlightedFields: [],

    //TODO: replace with server code
    tilePositions: [
        [1, 0, 1, 0, 1, 0, 1, 0],
        [0, 1, 0, 1, 0, 1, 0, 1],
        [1, 0, 1, 0, 1, 0, 1, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, -1, 0, -1, 0, -1, 0, -1],
        [-1, 0, -1, 0, -1, 0, -1, 0],
        [0, -1, 0, -1, 0, -1, 0, -1],
    ],
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
        if (position.row === props.row && position.column === props.column) {
            tileColor = mixColors(tileColor, '#FF0000');
        }
    }

    //check if selected
    if (props.globalState.selectedTile != null && props.globalState.selectedTile.row === props.row && props.globalState.selectedTile.column === props.column) {
        tileColor = mixColors(tileColor, '#f5ad42');
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
    for (let i = 0; i < Constants.BOARD_SIZE; i++) {
        //use index as id key
        rows.push(
            <ChessRow
                chars={globalState.tilePositions[i]}
                column={i}
                key={i}
                globalState={globalState}
                onClick={(selectedField) => {
                    const fieldState = globalState.tilePositions[selectedField.column][selectedField.row]

                    //player on field -> highlight fields
                    if (fieldState === 1 || fieldState === -1) {

                        //TODO: PHILIPP: state logic here
                        //highlighted fields are stored inside an array in the global state.
                        //fields are objects {row: 0, column: 0}
                        setGlobalState({
                            highlightedFields: [{
                                row: selectedField.row - 1,
                                column: selectedField.column - 1
                            }, {row: selectedField.row + 1, column: selectedField.column - 1},],
                            tilePositions: globalState.tilePositions,
                            selectedTile: {
                                row: selectedField.row,
                                column: selectedField.column
                            }
                        });
                    }

                    //check if clicked field is highlighted
                    let highlighted = false;
                    for (let position of globalState.highlightedFields) {
                        if (position.row === selectedField.row && position.column === selectedField.column) {
                            highlighted = true;
                            break;
                        }
                    }

                    //click on highlighted field -> move player to field
                    if (highlighted) {
                        const fieldTo = selectedField;
                        const fieldFrom = {column: globalState.selectedTile.column, row: globalState.selectedTile.row}
                        const chessField = globalState.tilePositions;

                        chessField[fieldTo.column][fieldTo.row] = chessField[fieldFrom.column][fieldFrom.row];
                        chessField[fieldFrom.column][fieldFrom.row] = 0;

                        setGlobalState({
                            highlightedFields: [],
                            tilePositions: chessField,
                            selectedTile: null
                        });
                    }


                }}
            ></ChessRow>);
    }
    return <globalStateContext.Provider value={globalState}>
        <div>{rows}</div>
    </globalStateContext.Provider>;
}
