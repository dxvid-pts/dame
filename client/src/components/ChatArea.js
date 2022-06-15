import { io } from "https://cdn.socket.io/4.4.1/socket.io.esm.min.js";
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
    console.log(text);
    socket.emit("message", text);
}

function createGame() {
    socket.emit("createGame", { nick: "Player1", public: true, guests: true });
}

function joinGame() {
    socket.emit("joinGame", {nick: "Player2", gameid: document.querySelector("input").value});
}

export default function ChatArea() {
    return (
        <div className="item3">
            <p id={"chatBox"}></p>
            <input></input>
            <button onClick={onClick}>Text Message</button>
            <button onClick={createGame}>createGame</button>
            <button onClick={joinGame}>joinGame</button>
        </div>
    );
}
