
export function connect(port) {
    const { io } = require("socket.io-client");
    var socketid = null;
    const socket = io("ws://localhost:" + port);
    socket.on("socketid", (id) => (socketid = id));

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

    function sendCreateGame(nick, spectatable) {
        socket.emit("createGame", {
            nick: nick,
            spectatable: spectatable
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

    function sendMove(fX, fY, tX, tY) {
        socket.emit("move", {
             from: { x: fX, y: fY }, to: { x: tX, y: tY } },
        );
    }

    //Getters + Setters

    function getSocketID() {
        return socketid;
    }

    return {
        sendCreateGame,
        sendJoinGame,
        listenOnError,
        listenOnLog,
        listenOnGameState,
        listenOnMessage,
        sendMessage,
        listenOnPlayerJoin,
        sendLeaveGame,
        listenOnPlayerLeave,
        sendMove,
        sendSpectateGame,
        getSocketID,
    };
}
