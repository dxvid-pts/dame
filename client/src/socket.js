import { io } from "https://cdn.socket.io/4.4.1/socket.io.esm.min.js";

var socket;

function initSocket(port) {
    socket = io("ws://localhost:" + port);
}

//Listening Functions

function listenOnMessage(func) {
    socket.on("message", (args) => {
        func(args);
    });
}

function listenOnError(func) {
    socket.on("error", (args) => {
        func(args);
    });
}

//Send Functions

function sendCreateGame(nick, visible, guests) {
    socket.emit("createGame", {
        nick: nick,
        visible: visible,
        guests: guests,
    });
}

function sendJoinGame(nick, gameid) {
    socket.emit("joinGame", {
        nick: nick,
        gameid: gameid,
    });
}

export { initSocket, sendCreateGame, sendJoinGame, listenOnMessage, listenOnError};
