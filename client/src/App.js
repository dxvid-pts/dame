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
        this.state = { game: null, error: null, msg: [] };

        this.getGamePath = this.getGamePath.bind(this);
        this.leaveGame = this.leaveGame.bind(this);
    }

    componentDidMount() {
        socket.listenOnPlayerJoin((args) => {
            if (args.player.id === socket.getSocketID()) {
                this.setState({
                    game: {
                        id: args.game,
                        player: args.player,
                        leaveGame: this.leaveGame,
                    },
                });
            }
            const newMSG = [...this.state.msg];
            newMSG.push({ sender: "sys", content: "Player "+args.player.nick + " joined.", time: args.time});
            this.setState({msg: newMSG});
        });

        socket.listenOnError((args) => {
            this.setState({ error: <Error msg={args.msg} render={true} /> });
        });

        socket.listenOnMessage((args) => {
            const newMSG = [...this.state.msg];
            newMSG.push({ sender: args.player, content: args.msg, time: args.time});
            this.setState({msg: newMSG});
        });

        socket.listenOnPlayerLeave((args) => {
            const newMSG = [...this.state.msg];
            newMSG.push({ sender: "sys", content: "Player "+args.player.nick + " left.", time: args.time});
            this.setState({msg: newMSG});
        });

        socket.listenOnGameState((state) => {
            //update renderer with results from server
            let newGame = {...this.state.game.state};
            newGame["tilePositions"] = state.board;
            newGame["nextPossibleTurns"] = state.nextPossibleTurns;
            newGame["nextTurnPlayer"] = state.nextTurnPlayer.id;
            newGame["currentPlayerId"] = socket.getSocketID();
            this.setState(newGame);
        });
    }

    leaveGame() {
        socket.sendLeaveGame();
        this.setState({ game: null, msg: [] });
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
                                        msg={this.state.msg}
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
