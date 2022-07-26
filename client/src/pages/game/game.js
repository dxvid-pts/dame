import GameArea from "../../components/game/GameArea";
import ChatArea from "../../components/chat/ChatArea";

export default function Index(props) {
    return (
        <div className="grid-container">
            <div id="header">Header</div>
            <GameArea socket={props.socket}></GameArea>
            <ChatArea socket={props.socket} />
        </div>
    );
}
