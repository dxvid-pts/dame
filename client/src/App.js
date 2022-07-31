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
import { turnBoard, turnNextPossibleTurns } from "./shared/rotate";

const constants = require("./shared/constants");
const socketConnection = require("./socket.js");
const socket = socketConnection.connect(4000);

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            game: null,
            gameState: {
                selectedTile: null,
                highlightedFields: [],
                tilePositions: constants.EMPTY_BOARD,
                nextPossibleTurns: [],
                nextTurnPlayer: null,
                currentPlayerId: null,
                playerBottom: true,
                setGameState: (args) => this.setState({ gameState: args }),
            },
            error: null,
            msg: [],
        };

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
                        nextTurn: null,
                        winner: null,
                        leaveGame: this.leaveGame,
                    },
                });
            }
            const newMSG = [...this.state.msg];
            newMSG.push({
                sender: "sys",
                content: "Player " + args.player.nick + " joined.",
                time: args.time,
            });
            this.setState({ msg: newMSG });
        });

        socket.listenOnError((args) => {
            this.setState({ error: <Error msg={args.msg} render={true} /> });
        });

        socket.listenOnMessage((args) => {
            const newMSG = [...this.state.msg];
            newMSG.push({
                sender: args.player,
                content: args.msg,
                time: args.time,
            });
            this.setState({ msg: newMSG });
        });

        socket.listenOnPlayerLeave((args) => {
            const newMSG = [...this.state.msg];
            newMSG.push({
                sender: "sys",
                content: "Player " + args.player.nick + " left.",
                time: args.time,
            });
            this.setState({ msg: newMSG });
        });

        socket.listenOnGameState((state) => {
            if (state.nextTurnPlayer === null && state.winner === null) {
                return;
            }
            if(state.nextTurnPlayer === null && state.winner !== null) state.nextTurnPlayer = state.winner;
            //update renderer with results from server
            const g = { ...this.state.game };
            g.nextTurn = state.nextTurnPlayer.id;
            g.winner = state.winner;

            const playerBottom =
                state.nextTurnPlayer.id === socket.getSocketID()
                    ? state.nextTurnPlayer.tile === -1
                    : state.nextTurnPlayer.tile === 1;

            //game logic
            let newGame = { ...this.state.gameState };
            newGame["tilePositions"] = playerBottom
                ? state.board
                : turnBoard(state.board);
            newGame["nextPossibleTurns"] = playerBottom
                ? state.nextPossibleTurns
                : turnNextPossibleTurns(state.nextPossibleTurns);
            newGame["nextTurnPlayer"] = state.nextTurnPlayer.id;
            newGame["currentPlayerId"] = socket.getSocketID();
            newGame["playerBottom"] = playerBottom;
            this.setState({ gameState: newGame, game: g });
        });
    }

    leaveGame() {
        socket.sendLeaveGame();
        this.setState({ game: null, msg: [] });
    }

    getGamePath() {
        return this.state.game === null ? "" : "/" + this.state.game.id;
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
                                        gameState={this.state.gameState}
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
                        <Route
                            path="/test"
                            element={
                                <GamePage
                                    socket={socket}
                                    game={{
                                        id: "TEST",
                                        player: {
                                            id: null,
                                            tile: -1,
                                            nick: "TEST_PLAYER",
                                        },
                                        nextTurn: null,
                                        leaveGame: this.leaveGame,
                                    }}
                                    gameState={this.state.gameState}
                                    msg={this.state.msg}
                                />
                            }
                        />
                    </Routes>
                </Router>
            </div>
        );
    }
}
