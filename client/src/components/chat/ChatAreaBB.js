import { io } from "https://cdn.socket.io/4.4.1/socket.io.esm.min.js";
import "./ChatMessage"
import ChatMessage from "./ChatMessage";
const Constants = require("shared/constants");

const socket = io("ws://localhost:" + Constants.CONNECTION_PORT);

socket.on("message", (text) => {
    const t = document.getElementById("chatBox");
    t.innerText = text;
});

socket.on("error", (error) => {
    console.log(error);
});

function onClick() {
    const text = document.querySelector("input").value;
    socket.emit("message", text);
}

function createGame() {
    socket.emit("createGame", { nick: "Player1", public: true, guests: true });
}

function joinGame() {
    socket.emit("joinGame", {nick: "Player2", gameid: document.querySelector("input").value});
}

function generateMessages () {
    const messages = [];
    const user = {name: "Jan"};
    const msg = {
        ownedByCurrentUser: true, user: user, room: "test", body: "Dies ist ein Test"
    };
    messages.push(msg);
    const user2 = {name: "Anderer Spieler"};
    const msg2 = {
        ownedByCurrentUser: false, user: user2, room: "test", body: "Eine Antwort auf den Test"
    };
    messages.push(msg2);
    return messages;

}

export default function ChatArea() {
    const messages = generateMessages();
    return (
        <div id="chat">
            <p id={"chatBox"}></p>
            <h1>Chat Window</h1>
            <p>
             {messages.map((message, i) => (
                <li key={i}>
                    <ChatMessage message={message}></ChatMessage>
                </li>
             ))}
            </p>
            <input></input>
            <button onClick={onClick}>Text Message</button>
            <button onClick={createGame}>createGame</button>
            <button onClick={joinGame}>joinGame</button>
        </div>
    );
}
