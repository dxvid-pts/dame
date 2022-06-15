import './App.css';
import GameArea from './components/game/GameArea';
import ChatArea from './components/chat/ChatArea';

function App() {
    return (
        <div className="App">
            <div className="grid-container">
                <div className="item1">Header</div>
                <GameArea></GameArea>
                <ChatArea></ChatArea>
            </div>
        </div>
    );
}

export default App;
