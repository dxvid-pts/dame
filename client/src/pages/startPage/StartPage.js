import React from "react";

import "./StartPage.css";

//component for the start page
export default class StartPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = { nickname: null, gameid: ""};
        this.socket = props.socket;

        this.onCreateGame = this.onCreateGame.bind(this);
        this.onJoinGame = this.onJoinGame.bind(this);
        this.onPlayAI = this.onPlayAI.bind(this);
        this.onPlayRandom = this.onPlayRandom.bind(this);
    }

    //on create game event
    onCreateGame() {
        if (this.state.nickname === null) {
            return;
        }
        this.socket.sendCreateGame(this.state.nickname, false);
    }

    //on join event
    onJoinGame(){
        if (this.state.nickname === null || this.state.gameid === "") {
            return;
        }
        this.socket.sendJoinGame(this.state.nickname, this.state.gameid);
    }

    //on play random event
    onPlayRandom() {
        if (this.state.nickname === null) {
            return;
        }
        this.socket.sendJoinGame(this.state.nickname, "RANDOM");
    }

    //on play AI event
    onPlayAI() {
        if (this.state.nickname === null) {
            return;
        }
        this.socket.sendJoinGame(this.state.nickname, "AI");
    }

    render() {
        return (
            <div className="StartPage">
                <div className="Title">
                    <div className="Black">Checkers</div>
                    <div className="White">Online</div>
                </div>
                <form
                    className="Menu"
                    onSubmit={(event) => {
                        event.preventDefault();
                    }}
                >
                    <div className="InputMenu">
                        <input
                            type="text"
                            id="username"
                            className="Input"
                            placeholder="Nickname"
                            autoComplete="off"
                            required
                            onChange={(event) =>
                                this.setState({ nickname: event.target.value })
                            }
                        ></input>
                    </div>
                    <div className="SubMenu">
                        <button
                            className="Button PlayButton"
                            onClick={this.onCreateGame}
                        >
                            Create Game
                        </button>
                    </div>
                    <div className="SubMenu">
                        <input
                            type="text"
                            className="Input"
                            placeholder="Game ID"
                            autoComplete="off"
                            onChange={(event) =>
                                this.setState({ gameid: event.target.value })
                            }
                        ></input>
                        <button
                            className="Button PlayButton"
                            onClick={this.onJoinGame}
                        >
                            Join Game
                        </button>
                    </div>
                    <div className="SubMenu">
                        <button className="Button PlayButton" onClick={this.onPlayAI}>
                            Play vs AI
                        </button>
                    </div>
                    <div className="SubMenu">
                        <button
                            className="Button PlayButton"
                            onClick={this.onPlayRandom}
                        >
                            Play vs a Random Enemy
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}
