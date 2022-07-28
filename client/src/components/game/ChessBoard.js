import {createContext, useState} from "react";
import './ChessBoard.css';

const Constants = require("shared/constants");

const descriptionSize = 35;

export function PlayerTile(props) {
    return <img alt={"self-Logo"} src={props.img.default} style={{
        width: "100%",
        height: "100%",
        "pointer-events": "none",
        "user-select": "none",
        visibility: props.visible ? "visible" : "hidden",
    }}></img>;
}

const initialGlobalState = {
    selectedTile: null, highlightedFields: [],

    //TODO: replace with server code
    tilePositions: Constants.INITIAL_BOARD, nextPossibleTurns: [], nextTurnPlayer: null, currentPlayerId: null,
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
    if (props.globalState.selectedTile != null && props.globalState.selectedTile.row === props.row && props.globalState.selectedTile.column === props.column) {
        tileColor = tileColor = "rgba(245,173,66," + opacity + ")";
        // tileColor = mixColors(tileColor, '#f5ad42');
    }

    let p;
    switch (props.char) {
        case -1:
            p = <PlayerTile img={Constants.PLAYER_SVG_WHITE} visible={true}></PlayerTile>;
            break;
        case 1:
            p = <PlayerTile img={Constants.PLAYER_SVG_BLACK} visible={true}></PlayerTile>;
            break;
        default:
            p = <PlayerTile img={Constants.PLAYER_SVG_BLACK} visible={false}></PlayerTile>;
    }

    const backgroundImgUrl = white ? Constants.BOARD_WHITE : Constants.BOARD_BLACK;

    const x = ["a", "b", "c", "d", "e", "f", "g", "h"];
    let gridArea = x[props.column] + "" + x[props.row];

    return <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => props.onClick({row: props.row, column: props.column})}
        style={{
            gridArea: gridArea, backgroundImage: "url(" + backgroundImgUrl + ")",
        }}>
        <div style={{
            backgroundColor: tileColor,
        }}
        >{p}</div>
    </div>;
}

export function ChessRow(props) {
    const tiles = [];
    for (let i = 0; i < Constants.BOARD_SIZE; i++) {
        tiles.push(<ChessBoardTile
            char={props.chars[i]}
            column={props.column}
            row={i}
            onClick={props.onClick}
            globalState={props.globalState}
            key={props.column + "" + i}
        ></ChessBoardTile>);
    }

    return tiles;
}

export function Corner(props) {
    return <div style={{
        gridArea: props.area,
        backgroundImage: "url(" + Constants.BOARD_WHITE + ")",
        borderTopLeftRadius: props.area === "c1" ? "8px" : "0",
        borderTopRightRadius: props.area === "c2" ? "8px" : "0",
        borderBottomLeftRadius: props.area === "c3" ? "8px" : "0",
        borderBottomRightRadius: props.area === "c4" ? "8px" : "0",
    }}></div>
}

export function BoardDescriptionSide(props) {
    const descriptions = ["A", "B", "C", "D", "E", "F", "G", "H"];

    return descriptions.map((e, index) => <div
        style={{
            gridArea: (props.rotate ? "dr" : "dl") + (index + 1).toString(),
            textAlign: "center",
            transform: "rotate(" + (props.rotate ? 180 : 0) + "deg)",
            backgroundImage: "url(" + Constants.BOARD_WHITE + ")",
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
        }}><p>{e}</p>
    </div>);
}

export function BoardDescriptionBottomTop(props) {
    const descriptions = ["1", "2", "3", "4", "5", "6", "7", "8"];

    return descriptions.map((e, index) => <div
        style={{
            gridArea: (props.rotate ? "dt" : "db") + (index + 1).toString(),
            transform: "rotate(" + (props.rotate ? 180 : 0) + "deg)",
            backgroundImage: "url(" + Constants.BOARD_WHITE + ")",
            textAlign: "center",
        }}><p style={{margin: descriptionSize / 4.5}}>{e}</p>
    </div>);
}

export function ChessBoardGrid(props) {
    const rows = [];

    const socket = props.socket;

    socket.listenOnGameState((state) => {
        //update renderer with results from server
        let newGlobalState = {...props.globalState};
        newGlobalState["tilePositions"] = state.board;
        newGlobalState["nextPossibleTurns"] = state.nextPossibleTurns;
        newGlobalState["nextTurnPlayer"] = state.nextTurnPlayer.id;
        newGlobalState["currentPlayerId"] = socket.getSocketID();
        props.setGlobalState(newGlobalState);
    });

    for (let i = 0; i < Constants.BOARD_SIZE; i++) {
        //use index as id key
        rows.push(<ChessRow
            chars={props.globalState.tilePositions[i]}
            column={i}
            key={i}
            globalState={props.globalState}
            onClick={(selectedField) => {
                //ignore click if player is not allowed to move
                if (props.globalState.currentPlayerId !== props.globalState.nextTurnPlayer) {
                    return;
                }

                const fieldState = props.globalState.tilePositions[selectedField.column][selectedField.row]

                //player on field -> highlight fields
                if (fieldState === 1 || fieldState === -1) {

                    //get highlightedFields (fields where a tile can possibly move to) from shared code
                    let highlightedFields = [];
                    let nextPossibleTurns = props.globalState.nextPossibleTurns == null ? [] : props.globalState.nextPossibleTurns;

                    for (let element of nextPossibleTurns) {
                        if (element.from.y === selectedField.column && element.from.x === selectedField.row) {
                            highlightedFields = element.to.map(e => {
                                return {"row": e.x, "column": e.y};
                            });
                            break;
                        }

                    }

                    //update renderer
                    let newGlobalState = {...props.globalState};
                    newGlobalState["highlightedFields"] = highlightedFields;
                    newGlobalState["selectedTile"] = {
                        row: selectedField.row, column: selectedField.column
                    };
                    props.setGlobalState(newGlobalState);
                }

                //check if clicked field is highlighted
                let highlighted = false;
                for (let position of props.globalState.highlightedFields) {
                    if (position.row === selectedField.row && position.column === selectedField.column) {
                        highlighted = true;
                        break;
                    }
                }

                //click on highlighted field -> move player to field
                if (highlighted) {
                    const fieldTo = selectedField;
                    const fieldFrom = {
                        column: props.globalState.selectedTile.column, row: props.globalState.selectedTile.row
                    }
                    const chessField = props.globalState.tilePositions;

                    chessField[fieldTo.column][fieldTo.row] = chessField[fieldFrom.column][fieldFrom.row];
                    chessField[fieldFrom.column][fieldFrom.row] = 0;

                    //update renderer before getting results from server
                    let newGlobalState = {...props.globalState};
                    newGlobalState["highlightedFields"] = [];
                    newGlobalState["selectedTile"] = null;
                    newGlobalState["tilePositions"] = chessField;
                    props.setGlobalState(newGlobalState);

                    //send info to server (also updates every data again to prevent cheating)
                    socket.sendMove(fieldFrom.row, fieldFrom.column, fieldTo.row, fieldTo.column);
                }


            }}
        ></ChessRow>);
    }

    return rows;
}

export function PlayerTurnInfo(props) {
    if (props.globalState.currentPlayerId == null || props.globalState.nextTurnPlayer == null) {
        return <div></div>;
    }
    let text = props.globalState.currentPlayerId === props.globalState.nextTurnPlayer ? "Your turn!" : "Not your turn!";
    return <div id="player-turn-info"><p>{text}</p>
    </div>;
}

export default function ChessBoard(props) {
    const [globalState, setGlobalState] = useState(initialGlobalState);

    return <globalStateContext.Provider value={globalState}>

        <div id={"board-grid-container"}>
            <BoardDescriptionBottomTop rotate={true}></BoardDescriptionBottomTop>
            <BoardDescriptionSide rotate={false}></BoardDescriptionSide>
            <ChessBoardGrid socket={props.socket} setGlobalState={setGlobalState}
                            globalState={globalState}></ChessBoardGrid>
            <BoardDescriptionSide rotate={true}></BoardDescriptionSide>
            <div style={{gridArea: "border1", backgroundColor: "black"}}></div>
            <div style={{gridArea: "border2", backgroundColor: "black"}}></div>
            <div style={{gridArea: "border3", backgroundColor: "black"}}></div>
            <div style={{gridArea: "border4", backgroundColor: "black"}}></div>
            <Corner area={"c1"}></Corner>
            <Corner area={"c2"}></Corner>
            <Corner area={"c3"}></Corner>
            <Corner area={"c4"}></Corner>
            <div style={{gridArea: "a", borderRadius: "8px", background: "wheat"}}></div>
            <div style={{gridArea: "b", borderRadius: "8px", background: "wheat"}}></div>
            <BoardDescriptionBottomTop rotate={false}></BoardDescriptionBottomTop>
        </div>
        <PlayerTurnInfo setGlobalState={setGlobalState}
                        globalState={globalState}></PlayerTurnInfo>

    </globalStateContext.Provider>;
}