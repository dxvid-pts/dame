import GameArea from "../../components/game/GameArea";
import ChatArea from "../../components/chat/ChatArea";
import Header from "../../components/header";

export default function Index(props) {
    return (
        <div className="grid-container">
        <Header></Header>
        <div style={{gridArea: "blackbox2", backgroundColor: "black"}}></div>
        <GameArea socket={props.socket}></GameArea>
        <ChatArea socket={props.socket}/>
        <div style={{gridArea: "blackbox", backgroundColor: "black"}}></div></div>
    );
}
