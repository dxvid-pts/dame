import {createContext, useState} from "react";
import './ChessBoard.css';

const checkers = require("shared/checkers");

const Constants = require("shared/constants");

//change values in chessboard as well if values below are tweaked
const tileSize = 80;
const borderSize = 4;
const chessGridSizeComplete = tileSize * 8;
const chessGridBorderSizeComplete = tileSize * 8 + borderSize * 2;
const descriptionSize = 35;

export function PlayerTile(props) {
    return <img alt={"self-Logo"} src={props.img} style={{
        width: tileSize, height: tileSize, "pointer-events": "none", "user-select": "none"
    }}></img>;
}

const initialGlobalState = {
    selectedTile: null, highlightedFields: [],

    //TODO: replace with server code
    tilePositions: Constants.INITIAL_BOARD,
};

const globalStateContext = createContext(initialGlobalState);

export function ChessBoardTile(props) {
    const [isHovered, setIsHovered] = useState(false);

    //set grid colors
    let white = props.row % 2 === 0;

    if (props.column % 2 === 0) {
        white = !white;
    }

    const opacity = 0.4;
    let tileColor = ""; //white ? Constants.COLOR_CHESSBOARD_EVEN : Constants.COLOR_CHESSBOARD_ODD;

    if (isHovered) {
        tileColor = "rgba(181,253,164," + opacity + ")";
    }

    //render highlighted fields
    for (let position of props.globalState.highlightedFields) {
        if (position.row === props.row && position.column === props.column) {
            tileColor = tileColor = "rgba(255,0,0," + opacity + ")";
            //tileColor = mixColors(tileColor, '#FF0000');
        }
    }

    //check if selected
    if (
        props.globalState.selectedTile != null &&
        props.globalState.selectedTile.row === props.row &&
        props.globalState.selectedTile.column === props.column
    ) {
        tileColor = tileColor = "rgba(245,173,66," + opacity + ")";
        // tileColor = mixColors(tileColor, '#f5ad42');
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

    const backgroundImgUrl = white
        ? Constants.BOARD_WHITE
        : Constants.BOARD_BLACK;

    return <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => props.onClick({row: props.row, column: props.column})}
        style={{
            width: tileSize, height: tileSize, backgroundImage: "url(" + backgroundImgUrl + ")"
        }}>
        <div style={{
            width: tileSize, height: tileSize, backgroundColor: tileColor,
        }}
        >{p}</div>
    </div>;
}

export function ChessRow(props) {
    const tiles = [];
    for (let i = 0; i < Constants.BOARD_SIZE; i++) {
        tiles.push(
            <ChessBoardTile
                char={props.chars[i]}
                column={props.column}
                row={i}
                onClick={props.onClick}
                globalState={props.globalState}
                key={props.column + "" + i}
            ></ChessBoardTile>
        );
    }

    return <div style={{ display: "flex" }}>{tiles}</div>;
}

export function BoardDescriptionSide(props) {
    const descriptions = ["A", "B", "C", "D", "E", "F", "G", "H"];

    return <div
        style={{
            gridArea: props.rotate ? "board-description-right" : "board-description-left", //backgroundColor: "red",
            backgroundImage: "url(" + Constants.BOARD_WHITE + ")",
            width: descriptionSize,
            height: chessGridBorderSizeComplete,
            float: "left",
            transform: "rotate(" + (props.rotate ? 180 : 0) + "deg)"
        }}>
        {descriptions.map(e => <div
            style={{
                height: tileSize, justifyContent: "center", alignItems: "center", display: "flex"
            }}>
            <p>{e}</p></div>)}
    </div>;
}

export function BoardDescriptionBottomTop(props) {
    const descriptions = ["1", "2", "3", "4", "5", "6", "7", "8"];

    return <div
        style={{
            gridArea: props.rotate ? "board-description-top" : "board-description-bottom",
            backgroundImage: "url(" + Constants.BOARD_WHITE + ")", // backgroundColor: "yellow",
            height: descriptionSize,
            width: chessGridBorderSizeComplete,
            paddingLeft: descriptionSize,
            paddingRight: descriptionSize,
            transform: "rotate(" + (props.rotate ? 180 : 0) + "deg)"
        }}>
        {descriptions.map(e => <div
            style={{width: tileSize, height: descriptionSize, float: "left", textAlign: "center"}}><p
            style={{margin: descriptionSize / 4.5}}>{e}</p>
        </div>)}
    </div>;
}

export function ChessBoardGrid(props) {
    const [globalState, setGlobalState] = useState(initialGlobalState);

    const rows = [];
    
    const socket = props.socket;

    socket.listenOnGameState((state) =>{
        setGlobalState({
            highlightedFields: [],
            selectedTile: null,
            tilePositions: state.board,
        });
    });

    for (let i = 0; i < Constants.BOARD_SIZE; i++) {
        //use index as id key
        rows.push(<ChessRow
            chars={globalState.tilePositions[i]}
            column={i}
            key={i}
            globalState={globalState}
            onClick={(selectedField) => {
                const fieldState = globalState.tilePositions[selectedField.column][selectedField.row]

                //player on field -> highlight fields
                if (fieldState === 1 || fieldState === -1) {

                    //get highlightedFields (fields where a tile can possibly move to) from shared code
                    let highlightedFields = [];
                    for (let element of checkers.possiblePlayerTurns(globalState.tilePositions, fieldState)) {
                        if (element.from.y === selectedField.column && element.from.x === selectedField.row) {
                            highlightedFields = element.to.map(e => {
                                return {"row": e.x, "column": e.y};
                            });
                            break;
                        }

                    }

                    //update renderer
                    setGlobalState({
                        highlightedFields: highlightedFields, tilePositions: globalState.tilePositions, selectedTile: {
                            row: selectedField.row, column: selectedField.column
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
                        highlightedFields: [], tilePositions: chessField, selectedTile: null
                    });
                }


            }}
        ></ChessRow>);
    }

    return <div
        style={{
            border: borderSize + 'px solid rgba(0, 0, 0, 255)',
            width: chessGridSizeComplete,
            height: chessGridSizeComplete,
            float: "left"
        }}>{rows}</div>;
}

export default function ChessBoard(props) {
    const [globalState, setGlobalState] = useState(initialGlobalState);

    return <globalStateContext.Provider value={globalState}>
        <div id={"board-grid-container"}>
            <BoardDescriptionBottomTop rotate={true}
                                       style={{gridArea: "board-description-top"}}></BoardDescriptionBottomTop>
            <BoardDescriptionSide rotate={false} style={{gridArea: "board-description-left"}}></BoardDescriptionSide>
            <div style={{gridArea: "board-grid"}}><ChessBoardGrid socket={props.socket}></ChessBoardGrid></div>
            <BoardDescriptionSide rotate={true}></BoardDescriptionSide>
            <BoardDescriptionBottomTop rotate={false}
                                       style={{gridArea: "board-description-bottom"}}></BoardDescriptionBottomTop>

        </div>
    </globalStateContext.Provider>;
}