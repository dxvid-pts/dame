import './App.css';
import GameArea from './components/GameArea';
import ChatArea from './components/ChatArea';

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
