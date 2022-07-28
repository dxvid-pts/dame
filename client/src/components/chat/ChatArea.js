import { useState } from "react";
import ChatMessage from "./ChatMessage.js";
import "./ChatArea.css";

function checkNickname(nickname) {
    if (nickname.toLowerCase() === "system") return false;
    else return true;
}

export default function ChatArea(props) {

    const socket = props.socket;

    function sendMsg(body) {
        socket.sendMessage(body);
        document.getElementById("msgBody").value = "";
    }

    return (
        <div className="ChatMenu" id={"chat"}>
            <div className="Chat">
                <ul>
                    {props.msg.map((m) => (
                        <li key={""+m.time} >
                            <ChatMessage playerid={props.socket.getSocketID()} msg={m}></ChatMessage>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="MessageMenu">
                <input
                    id="msgBody"
                    label="Your message"
                    className="Input InputMessage"
                    onKeyDown={(e) =>
                        e.key === "Enter"
                            ? sendMsg(document.getElementById("msgBody").value)
                            : null
                    }
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
