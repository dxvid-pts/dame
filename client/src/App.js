import './App.css';
import GameArea from './GameArea';
import ChatArea from './ChatArea';

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
