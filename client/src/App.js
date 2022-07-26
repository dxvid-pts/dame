import './App.css';
import GameArea from './components/game/GameArea';
import ChatArea from './components/chat/ChatArea';

const constants = require("shared/constants");
const socketConnection = require("./socket.js");
const socket = socketConnection.connect(constants.CONNECTION_PORT);

function App() {
    return <div className="App">
        <div className="grid-container">
            <div id="header">Header</div>
            <GameArea></GameArea>
            <ChatArea socket={socket}/>
        </div>
    </div>;
}

export default App;