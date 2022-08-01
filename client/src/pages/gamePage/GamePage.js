import GameArea from "../../components/game/GameArea";
import ChatArea from "../../components/chat/ChatArea";
import Header from "../../components/header/Header";

import "./GamePage.css";

//layout component for the chess grid
export default function GamePage(props) {
    return (<div className="GamePage">
            <Header game={props.game}/>
            <div className="GameContent">
                <div id="gameArea"><GameArea socket={props.socket} gameState={props.gameState}/></div>
                <div id="chatArea"><ChatArea msg={props.msg} socket={props.socket}/></div>
            </div>
        </div>);
}
