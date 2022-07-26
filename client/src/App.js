import './App.css';
import GameArea from './components/game/GameArea';
import ChatArea from './components/chat/ChatArea';
import Header from "./components/header";

const constants = require("shared/constants");
const socketConnection = require("./socket.js");
const socket = socketConnection.connect(constants.CONNECTION_PORT);

function App() {

    return <div className="App">
        <div className="grid-container">
            <Header></Header>
            <div style={{gridArea: "blackbox2", backgroundColor: "black"}}></div>
            <GameArea socket={socket}></GameArea>
            <ChatArea socket={socket}/>
            <div style={{gridArea: "blackbox", backgroundColor: "black"}}></div>
        </div>
    </div>;
}

export default App;