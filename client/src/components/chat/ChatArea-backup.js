import {sendCreateGame, sendJoinGame, initSocket, listenOnError} from "./../../socket.js"; //Pfad anpassen !! nicht gut 

const constants = require("shared/constants");

initSocket(constants.CONNECTION_PORT);

listenOnError((error) => console.log(error));

export default function ChatArea() {
    return (
        <div className="item3">
            <p id={"chatBox"}></p>
            <input></input>
            <button onClick={() => sendCreateGame("Philipp", true, true)}>createGame</button>
            <button onClick={() => sendJoinGame("David", document.querySelector("input").value)}>joinGame</button>
        </div>
    );
}
