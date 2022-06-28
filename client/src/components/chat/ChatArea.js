import { useState } from "react";
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
import ChatMessage from "./ChatMessage.js";
import "./ChatArea.css"
const constants = require("shared/constants");


initSocket(constants.CONNECTION_PORT);

listenOnError((error) => console.log({ type: "error", payload: error }));

listenOnLog((error) => console.log({ type: "log", payload: error }));

listenOnGameState((error) =>
    console.log({ type: "gameState", payload: error })
);


listenOnMessage((error) => console.log({ type: "message", payload: error }));

listenOnPlayerLeave((error) =>
console.log({ type: "message", payload: error })
);

export default function ChatArea() {
    listenOnPlayerJoin((payload) => playerJoined(payload)
    );
    const [msgs, setMsgs] = useState([]);
    const [gameId, setGameId] = useState("");
    const [nickname, setNickname] = useState("");
    function createGame(nickname) {
        if(nickname === "" || nickname === null) alert("Nickname can not be empty");
        else {
            sendCreateGame(nickname, true, true);
            setNickname(nickname);
        }
    }
    
    function joinGame(nickname, gameId) {
        console.log("test" + nickname + gameId);
        if((nickname === "" || nickname === null) && (gameId === "" || gameId === null)) alert("Nickname and GameId fields cannot be empty");
        else if((nickname === "" || nickname === null)) alert("Nickname cannot be empty");
        else if((gameId === "" || gameId === null)) alert("GameId cannot be empty");
        else {
            sendJoinGame(nickname, gameId);
            console.log(nickname + " joins game: " + gameId);
            setNickname(nickname);
        }
    }
    function playerJoined(payload){
        console.log("Player joined: " + payload);
        setGameId(payload.game);
        AddMessage({ user: {nickname: "System"}, body: "Player " + payload.player.nick + " joined the game"})
        
    }

    function AddMessage(message){
        console.log("Message: " + message);
        setMsgs(
            [...msgs,
                {
                    user: {nickname: message.nickname},
                    body: message.body
                }
            ]
        );
        
    }
    
    console.log("gameid: " + gameId + "     nick " + nickname + " msgs " + msgs.length); 
    
    return (
        <div>
            <p id={"chatBox"}>GameId: {gameId}</p>
            <button onClick={() => createGame(document.getElementById("nick").value)}>
                createGame
            </button>
            <input id="nick" placeholder="Nickname"></input>

            <button
                onClick={() => joinGame(document.getElementById("nick").value, document.getElementById("gameId").value)}
            >
                joinGame
            </button>
            <input id="gameId" placeholder="gameId"></input>
            <button
                onClick={() => sendMessage(document.getElementById("2").value)}
            >
                sendMessage
            </button>
            <button onClick={() => sendLeaveGame()}>leaveGame</button>
            <button onClick={() => sendMove(0, 2, 1, 3)}>sendMoveP1</button>
            <button onClick={() => sendMove(1, 5, 2, 4)}>sendMovePw</button>
            <p>Chatroom:
            </p>
               <ul>
                    {msgs.map((m) => (
                        <li>
                            <ChatMessage message={m} nickname={nickname}></ChatMessage>
                        </li>
                    ))}
               </ul>
                
        </div>
    );
   
}
