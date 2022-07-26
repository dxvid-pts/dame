import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Game from "./pages/game/game";
import Index from "./pages/land/land";

const constants = require("shared/constants");
const socketConnection = require("./socket.js");
const socket = socketConnection.connect(constants.CONNECTION_PORT);

function App() {
    var old = <div className="App"></div>;

    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route exact path="/" element={<Index socket={socket} />} />
                    <Route path="/game" element={<Game socket={socket} />}/>
                </Routes>
            </Router>
        </div>
    );
}

export default App;
