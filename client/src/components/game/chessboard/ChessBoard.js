import './ChessBoard.css';
import {BoardDescriptionBottomTop, BoardDescriptionSide} from "./BoardDescription";
import {Corner} from "./Corner";
import {ChessRow} from "./ChessBoardTile";
import {turnValue} from "shared/rotate";

const Constants = require("shared/constants");

//the main component for the chess board
//handles callback and a lot of the logic
export function ChessBoardGrid(props) {
    const rows = [];

    const socket = props.socket;

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
                if (fieldState !== 0) {

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
                    socket.sendMove(
                        props.globalState.playerBottom ? fieldFrom.row : turnValue(fieldFrom.row),
                        props.globalState.playerBottom ? fieldFrom.column : turnValue(fieldFrom.column),
                        props.globalState.playerBottom ? fieldTo.row : turnValue(fieldTo.row),
                        props.globalState.playerBottom ? fieldTo.column : turnValue(fieldTo.column)
                    );
                }


            }}
        ></ChessRow>);
    }

    return rows;
}

//composes everything to a chess board
export default function ChessBoard(props) {

    return <div id={"board-grid-container"}>
        <BoardDescriptionBottomTop rotate={true}></BoardDescriptionBottomTop>
        <BoardDescriptionSide rotate={false}></BoardDescriptionSide>
        <ChessBoardGrid socket={props.socket} setGlobalState={props.gameState.setGameState}
                        globalState={props.gameState}></ChessBoardGrid>
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
    </div>;
}