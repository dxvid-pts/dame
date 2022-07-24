import { useState } from "react";
import ChatMessage from "./ChatMessage.js";
import "./ChatArea.css";
import Button from "@mui/material/Button";
import Input from "@mui/material/TextField";

function checkNickname(nickname) {
    if (nickname.toLowerCase() === "system") return false;
    else return true;
}

export default function ChatArea(props) {
    const [msgs, setMsgs] = useState([]);
    const [gameId, setGameId] = useState(null);
    const [nickname, setNickname] = useState(null);

    const socket = props.socket;

    socket.listenOnError((error) =>
        console.log({ type: "error", payload: error })
    );
    socket.listenOnLog((error) => console.log({ type: "log", payload: error }));
    socket.listenOnGameState((error) =>
        console.log({ type: "gameState", payload: error })
    );
    socket.listenOnPlayerJoin((payload) => playerJoined(payload));
    socket.listenOnMessage((payload) => recMsg(payload));
    socket.listenOnPlayerLeave((payload) => playerLeft(payload));

    function createGame(nickname) {
        if (nickname === "" || nickname === null)
            alert("Nickname can not be empty");
        else if (checkNickname(nickname)) {
            socket.sendCreateGame(nickname, true, true);
            setNickname(nickname);
        } else alert("Nickname is not valid");
    }

    function joinGame(nickname, gameId) {
        if (
            (nickname === "" || nickname === null) &&
            (gameId === "" || gameId === null)
        )
            alert("Nickname and GameId fields cannot be empty");
        else if (nickname === "" || nickname === null)
            alert("Nickname cannot be empty");
        else if (gameId === "" || gameId === null)
            alert("GameId cannot be empty");
        else if (checkNickname(nickname)) {
            setNickname(nickname);
            socket.sendJoinGame(nickname, gameId);
        } else alert("Username is not valid");
    }

    function playerJoined(payload) {
        setGameId(payload.game);
        AddMessage({
            me: { nick: nickname, socketid: socket.getSocketID() },
            player: { nick: "system", socketid: "0" },
            msg: "Player " + payload.player.nick + " joined the game",
        });
    }

    function playerLeft(payload) {
        AddMessage({
            me: { nick: nickname, socketid: socket.getSocketID() },
            player: { nick: "system", socketid: "0" },
            msg: "Player " + payload.player.nick + " left the game",
        });
    }

    function sendMsg(body) {
        if (gameId !== "" && nickname !== "") {
            socket.sendMessage(body);
        } else alert("Error: Message not sent");
    }
    function recMsg(msg) {
        var message = {
            me: {
                nick: nickname,
                socketid: socket.getSocketID(),
            },
            msg: msg.msg,
            player: msg.player,
        };
        AddMessage(message);
    }
    function AddMessage(message) {
        setMsgs([
            ...msgs,
            {
                me: message.me,
                player: {
                    socketid: message.player.socketid,
                    nick: message.player.nick,
                },
                msg: message.msg,
            },
        ]);
    }

    function leaveGame() {
        setGameId(null);
        setMsgs([]);
        setNickname(null);
        socket.sendLeaveGame();
    }

    return (
        <div className="Chatside">
            <p id={"chatBox"}>GameId: {gameId}</p>
            <div className={gameId === null ? "test" : "hidden"}>
                <Input
                    variant="outlined"
                    label="Nickname"
                    id="nick"
                    value={nickname}
                ></Input>
                <Button
                    onClick={() =>
                        createGame(document.getElementById("nick").value)
                    }
                >
                    create Game
                </Button>
            </div>
            <div className={gameId === null ? "test" : "hidden"}>
                {gameId === null ? (
                    <Input
                        variant="outlined"
                        id="gameId"
                        label="gameId"
                        value={gameId}
                    ></Input>
                ) : null}
                {gameId === null ? (
                    <Button
                        onClick={() =>
                            joinGame(
                                document.getElementById("nick").value,
                                document.getElementById("gameId").value
                            )
                        }
                    >
                        join Game
                    </Button>
                ) : null}
            </div>
            <div className="test">
                <Input
                    variant="outlined"
                    id="msgBody"
                    label="Your message"
                ></Input>
                <Button
                    onClick={() =>
                        sendMsg(document.getElementById("msgBody").value)
                    }
                >
                    send Message
                </Button>
            </div>
            <br />

            <div className="test">
                <Button onClick={() => leaveGame()}>leaveGame</Button>
                <Button onClick={() => socket.sendMove(0, 2, 1, 3)}>
                    sendMoveP1
                </Button>
                <Button onClick={() => socket.sendMove(1, 5, 2, 4)}>
                    sendMovePw
                </Button>
            </div>
            <div className="Chat">
                <p>Chatroom:</p>
                <ul>
                    {msgs.map((m) => (
                        <li>
                            <ChatMessage message={m}></ChatMessage>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
