import {io} from "https://cdn.socket.io/4.4.1/socket.io.esm.min.js";
const Constants = require("shared/constants")

const socket = io('ws://localhost:'+Constants.CONNECTION_PORT);

socket.on('message', text => {

    const t = document.getElementById("chatBox")
    t.innerText = text;

});

function onClick() {
    const text = document.querySelector('input').value;
    console.log(text);
    socket.emit('message', text);
}

export default function ChatArea() {
    return <div className="item3">
        <p id={"chatBox"}></p>
        <input></input>
        <button onClick={
            onClick
        }>Send
        </button>
    </div>;
}