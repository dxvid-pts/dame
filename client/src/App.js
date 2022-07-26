import './App.css';
import GameArea from './components/game/GameArea';
import ChatArea from './components/chat/ChatArea';

const constants = require("shared/constants");
const socketConnection = require("./socket.js");
const socket = socketConnection.connect(constants.CONNECTION_PORT);

function App() {
    return (
        <div className="App">
            <div className="grid-container">
                <div className="item1">Header</div>
                <GameArea socket={socket}></GameArea>
                <ChatArea socket={socket} />
            </div>
        </div>
    );
}

export default App;