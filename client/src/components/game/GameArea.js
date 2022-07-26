import ChessBoard from "./ChessBoard";

export default function GameArea(props) {
    return <div id="game"><ChessBoard socket={props.socket}></ChessBoard></div>;

}