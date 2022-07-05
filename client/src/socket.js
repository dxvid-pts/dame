import { io } from "https://cdn.socket.io/4.4.1/socket.io.esm.min.js";

var socket = null;
var socketid = null;

function initSocket(port) {
    socket = io("ws://localhost:" + port);
    socket.on("socketid", (id) => (socketid = id));
}

//Listening Functions

function listenOnMessage(func) {
    socket.on("msg", (args) => {
        func(args);
    });
}

function listenOnError(func) {
    socket.on("error", (args) => {
        func(args);
    });
}

function listenOnLog(func) {
    socket.on("log", (args) => {
        func(args);
    });
}

function listenOnPlayerJoin(func) {
    socket.on("playerJoin", (args) => {
        func(args);
    });
}

function listenOnGameState(func) {
    socket.on("gameState", (args) => {
        func(args);
    });
}

function listenOnPlayerLeave(func) {
    socket.on("playerLeave", func);
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

function sendSpectateGame(gameid) {
    socket.emit("spectateGame", {
        gameid: gameid,
    });
}

function sendMessage(msg) {
    socket.emit("msg", {
        msg: msg,
    });
}

function sendLeaveGame() {
    socket.emit("leaveGame");
}


function sendMove(fX, fY, tX, tY){
    socket.emit("move", {move: {from: {x: fX, y: fY}, to: {x: tX, y: tY}}});
}

//Getters + Setters

function getSocketID() {
    return socketid;
}

export {
    getSocketID,
    initSocket,
    sendCreateGame,
    sendJoinGame,
    listenOnMessage,
    listenOnError,
    listenOnLog,
    listenOnGameState,
    listenOnPlayerJoin,
    sendMessage,
    sendLeaveGame,
    listenOnPlayerLeave,
    sendMove,
    sendSpectateGame
};
