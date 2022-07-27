import "./App.css";
import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate,
} from "react-router-dom";
import React from "react";

import GamePage from "./pages/gamePage/GamePage";
import StartPage from "./pages/startPage/StartPage";

import Error from "./components/error/Error";

const constants = require("shared/constants");
const socketConnection = require("./socket.js");
const socket = socketConnection.connect(constants.CONNECTION_PORT);

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = { game: null, error: null};

        this.getGamePath = this.getGamePath.bind(this);
        this.leaveGame = this.leaveGame.bind(this);
    }

    componentDidMount() {
        socket.listenOnPlayerJoin((args) => {
            console.log(args);
            if (args.player.id === socket.getSocketID()) {
                this.setState({ game: { id: args.game, player: args.player, leaveGame:this.leaveGame } });
            }
        });

        socket.listenOnError((args) => {
            this.setState({ error: <Error msg={args.msg} render={true} /> });
        });
    }

    leaveGame(){
        socket.sendLeaveGame();
        this.setState({game: null});
    }

    getGamePath() {
        return this.state.game === null ? "" : this.state.game.id;
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
                                this.state.game !== null ? (
                                    <Navigate replace to={this.getGamePath()} />
                                ) : (
                                    <StartPage socket={socket} />
                                )
                            }
                        />
                        <Route
                            path={this.getGamePath()}
                            element={
                                this.state.game === null ? (
                                    <Navigate replace to="/" />
                                ) : (
                                    <GamePage
                                        socket={socket}
                                        game={this.state.game}
                                    />
                                )
                            }
                        />

                        <Route
                            exact
                            path="*"
                            element={<Navigate replace to="/" />}
                        ></Route>
                    </Routes>
                </Router>
            </div>
        );
    }
}
