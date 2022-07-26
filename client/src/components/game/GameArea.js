import ChessBoard from "./ChessBoard";

export default function GameArea(props) {
    return <div className="item2"><ChessBoard socket={props.socket}></ChessBoard></div>;
}