import "./App.css";
import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate,
} from "react-router-dom";

import React, { useState } from 'react';

import Game from "./pages/game/game";
import Index from "./pages/land/land";

const constants = require("shared/constants");
const socketConnection = require("./socket.js");
const socket = socketConnection.connect(constants.CONNECTION_PORT);

function App() {

    const [ingame, setIngame] = useState(false);


    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route
                        exact
                        path="/"
                        element={
                            ingame ? (
                                <Navigate replace to="/game" />
                            ) : (
                                <Index socket={socket} setIngame={setIngame}/>
                            )
                        }
                    />

                    <Route
                        path="/game"
                        element={
                            !ingame ? (
                                <Navigate replace to="/" />
                            ) : (
                                <Game socket={socket} setIngame={setIngame}/>
                            )
                        }
                    />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
