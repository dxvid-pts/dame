import "./App.css";
import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate,
} from "react-router-dom";
import React from "react";

import Game from "./pages/game/game";
import StartPage from "./pages/startPage/StartPage";

import Error from "./components/error/Error";

const constants = require("shared/constants");
const socketConnection = require("./socket.js");
const socket = socketConnection.connect(constants.CONNECTION_PORT);

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = { ingame: false, error: null };
    }

    componentDidMount() {
        socket.listenOnPlayerJoin((args) => {
            if (args.player.id === socket.getSocketID()) {
                this.setState({ ingame: true });
            }
        });

        socket.listenOnError((args) => {
            this.setState({ error: (<Error msg={args.msg} render={true} />) });
        });
    }

    render() {
        return (
            <div className="App">
               {this.state.error}
                <Router>
                    <Routes>
                        <Route
                            exact
                            path="/"
                            element={
                                this.state.ingame ? (
                                    <Navigate replace to="/game" />
                                ) : (
                                    <StartPage socket={socket} />
                                )
                            }
                        />

                        <Route
                            path="/game"
                            element={
                                !this.state.ingame ? (
                                    <Navigate replace to="/" />
                                ) : (
                                    <Game socket={socket} />
                                )
                            }
                        />
                    </Routes>
                </Router>
            </div>
        );
    }
}
