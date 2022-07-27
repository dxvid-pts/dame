import React from "react";

import "./StartPage.css";

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

    onCreateGame() {
        if (this.state.nickname === null) {
            return;
        }
        this.socket.sendCreateGame(this.state.nickname, false);
    }

    onJoinGame(){
        if (this.state.nickname === null || this.state.gameid === "") {
            return;
        }
        this.socket.sendJoinGame(this.state.nickname, this.state.gameid);
    }

    onPlayAI() {
        if (this.state.nickname === null) {
            return;
        }
    }

    onPlayRandom() {
        if (this.state.nickname === null) {
            return;
        }
        this.socket.sendJoinGame(this.state.nickname, "RANDOM");
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
