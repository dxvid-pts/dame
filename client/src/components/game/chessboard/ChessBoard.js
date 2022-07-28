import {createContext, useState} from "react";
import './ChessBoard.css';
import {BoardDescriptionBottomTop, BoardDescriptionSide} from "./BoardDescription";
import {Corner} from "./Corner";
import {PlayerTurnInfo} from "./PlayerTurnInfo";
import {ChessRow} from "./ChessBoardTile";

const Constants = require("shared/constants");

//global state for the board
const initialGlobalState = {
    selectedTile: null,
    highlightedFields: [],
    tilePositions: Constants.INITIAL_BOARD,
    nextPossibleTurns: [],
    nextTurnPlayer: null,
    currentPlayerId: null,
};

//create context for the global state
const globalStateContext = createContext(initialGlobalState);

//the main component for the chess board
//handles callback and a lot of the logic
export function ChessBoardGrid(props) {
    const rows = [];

    const socket = props.socket;

    //listen on server state
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

                    //update renderer with new state
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

//composes everything to a chess board
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