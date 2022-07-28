import GameArea from "../../components/game/GameArea";
import ChatArea from "../../components/chat/ChatArea";
import Header from "../../components/header/Header";

import "./GamePage.css";

export default function GamePage(props) {
    return (
        <div className="grid-container">
            <Header game={props.game} />

            <GameArea socket={props.socket}></GameArea>
            <ChatArea socket={props.socket} />
        </div>
    );
}
