import "./land.css";

import React, { useState } from "react";

function NicknameInput(props) {
    if (props.render) {
        return (
            <form
                className="box3"
                onSubmit={(event) => {
                    event.preventDefault();
                    props.setState(1);
                }}
            >
                <input
                    type="text"
                    id="username"
                    className="input"
                    placeholder="Nickname"
                    required
                    onChange={(event) => props.setNickname(event.target.value)}
                ></input>
                <button className="button button-xx">&#x2713;</button>
            </form>
        );
    } else {
        return null;
    }
}

function ChooseGameMode(props) {
    if (props.render) {
        return (
            <div className="box2">
                <button
                    className="button"
                    onClick={() => props.setGameMode("FRIEND")}
                >
                    Play vs Friend
                </button>
                <button
                    className="button"
                    onClick={() => props.setGameMode("AI")}
                >
                    Play vs AI
                </button>
                <button
                    className="button"
                    onClick={() => props.setGameMode("RANDOM")}
                >
                    Play vs Random
                </button>
            </div>
        );
    } else {
        return null;
    }
}

function FriendGame(props) {
    const [gameID, setGameID] = useState("");

    if (props.render) {
        return (
            <div className="box3">
                <button
                    className="button"
                    onClick={() => props.setGameMode("RANDOM")}
                >
                    Create New Game
                </button>
                <form
                    className="box3"
                    onSubmit={(event) => {
                        event.preventDefault();
                        props.joinGame(gameID);
                    }}
                >
                    <input
                        type="text"
                        id="username"
                        className="input"
                        placeholder="Game ID"
                        required
                        onChange={(event) => setGameID(event.target.value)}
                    ></input>
                    <button className="button">Join Game</button>
                </form>
            </div>
        );
    } else {
        return null;
    }
}

export default function Index(props) {
    const socket = props.socket;

    const [nickname, setNickname] = useState("");
    const [state, setState] = useState(0);

    function setGameMode(mode) {
        switch (mode) {
            case "RANDOM":
                joinGame("RANDOM");
                break;
            case "AI":
                break;
            case "FRIEND":
                setState(2);
                break;
            default:
                break;
        }
    }

    function joinGame(id) {
        socket.sendJoinGame(nickname, id);
    }

    return (
        <div>
            <div id="heading">
                <div id="text_black">Checkers</div>
                <div id="text_white">Online</div>
            </div>
            <div id="box">
                <NicknameInput
                    render={state === 0}
                    setNickname={setNickname}
                    setState={setState}
                />
                <ChooseGameMode
                    render={state === 1}
                    setGameMode={setGameMode}
                />
                <FriendGame render={state === 2} joinGame={joinGame} />
            </div>
        </div>
    );
}
