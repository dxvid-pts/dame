
export function connect(port) {
    const { io } = require("socket.io-client");
    var socketid = null;
    const socket = io(":" + port);
    socket.on("socketid", (id) => (socketid = id));

    //Listening Functions
    function listenOnMessage(func) {
        socket.on("msg", (args) => {
            func(args);
        });
    }

    //error event
    function listenOnError(func) {
        socket.on("error", (args) => {
            func(args);
        });
    }

    //log event
    function listenOnLog(func) {
        socket.on("log", (args) => {
            func(args);
        });
    }

    //player join event
    function listenOnPlayerJoin(func) {
        socket.on("playerJoin", (args) => {
            func(args);
        });
    }

    //game state event
    function listenOnGameState(func) {
        socket.on("gameState", (args) => {
            func(args);
        });
    }

    //player leave event
    function listenOnPlayerLeave(func) {
        socket.on("playerLeave", func);
    }

    //create game event
    function sendCreateGame(nick, spectatable) {
        socket.emit("createGame", {
            nick: nick,
            spectatable: spectatable
        });
    }

    //join game event
    function sendJoinGame(nick, gameid) {
        socket.emit("joinGame", {
            nick: nick,
            gameid: gameid,
        });
    }

    //spectate game event
    function sendSpectateGame(gameid) {
        socket.emit("spectateGame", {
            gameid: gameid,
        });
    }

    //send message event
    function sendMessage(msg) {
        socket.emit("msg", {
            msg: msg,
        });
    }

    //leave game event
    function sendLeaveGame() {
        socket.emit("leaveGame");
    }

    //send game move
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
