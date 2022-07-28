import { useState } from "react";
import ChatMessage from "./ChatMessage.js";
import "./ChatArea.css";

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

    return (
        <div className="ChatMenu" id={"chat"}>
            <div className="Chat">
                <ul>
                    {msgs.map((m) => (
                        <li>
                            <ChatMessage message={m}></ChatMessage>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="MessageMenu">
                <input
                    id="msgBody"
                    label="Your message"
                    className="Input InputMessage"
                ></input>
                <button
                    className="Button ButtonMessage"
                    onClick={() =>
                        sendMsg(document.getElementById("msgBody").value)
                    }
                >
                    SEND
                </button>
            </div>
        </div>
    );
}
