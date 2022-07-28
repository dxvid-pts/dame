import GameArea from "../../components/game/GameArea";
import ChatArea from "../../components/chat/ChatArea";
import Header from "../../components/header/Header";

import "./GamePage.css";

//<GameArea socket={props.socket} />

export default function GamePage(props) {
    return (
        
        <div className="GamePage">
            <Header game={props.game} />
            <div className="GameContent">
                <div className="GameArea">GAME AREA</div>
                <ChatArea msg={props.msg} socket={props.socket} />
            </div>
        </div>
    );
}
