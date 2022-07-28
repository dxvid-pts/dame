import ChessBoard from "./chessboard/ChessBoard";

//Component used for the grid layout of the game
export default function GameArea(props) {
    return <div id="game">
        <ChessBoard socket={props.socket}></ChessBoard>
    </div>;

}