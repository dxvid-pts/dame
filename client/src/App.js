import "./App.css";
import GameArea from "./components/game/GameArea";
import ChatArea from "./components/chat/ChatArea";
import Index from "./components/index/Index";

const constants = require("shared/constants");
const socketConnection = require("./socket.js");
const socket = socketConnection.connect(constants.CONNECTION_PORT);

function App() {
    var old = (
        <div className="App">
            <div className="grid-container">
                <div id="header">Header</div>
                <GameArea socket={socket}></GameArea>
                <ChatArea socket={socket} />
            </div>
        </div>
    );

    return (
        <div className="App">
            <Index socket={socket}/>
        </div>
    );
}

export default App;
