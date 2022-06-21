import {
    sendCreateGame,
    sendJoinGame,
    initSocket,
    listenOnError,
    listenOnLog,
    listenOnGameState,
    listenOnMessage,
    sendMessage,
    listenOnPlayerJoin,
    sendLeaveGame,
    listenOnPlayerLeave,
    sendMove,
} from "../../socket.js"; //Pfad anpassen !! nicht gut

const constants = require("shared/constants");

initSocket(constants.CONNECTION_PORT);

listenOnError((error) => console.log({ type: "error", payload: error }));

listenOnLog((error) => console.log({ type: "log", payload: error }));

listenOnGameState((error) =>
    console.log({ type: "gameState", payload: error })
);

listenOnPlayerJoin((error) =>
    console.log({ type: "playerJoined", payload: error })
);

listenOnMessage((error) => console.log({ type: "message", payload: error }));

listenOnPlayerLeave((error) =>
    console.log({ type: "message", payload: error })
);

export default function ChatArea() {
    return (
        <div className="item3">
            <p id={"chatBox"}></p>
            <button onClick={() => sendCreateGame("Philipp", true, true)}>
                createGame
            </button>
            <input id="1"></input>

            <button
                onClick={() =>
                    sendJoinGame("David", document.getElementById("1").value)
                }
            >
                joinGame
            </button>
            <input id="2"></input>
            <button
                onClick={() => sendMessage(document.getElementById("2").value)}
            >
                sendMessage
            </button>
            <button onClick={() => sendLeaveGame()}>leaveGame</button>
            <button onClick={() => sendMove(0, 2, 1, 3)}>sendMoveP1</button>
            <button onClick={() => sendMove(1, 5, 2, 4)}>sendMovePw</button>
        </div>
    );
}
