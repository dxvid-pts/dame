module.exports = (io, socket, gameHandler) => {
    const whichPlayer = require("../utils/whichPlayer");

    return (game) => {
        const p = whichPlayer(game, socket.id);

        const onPlayerLeave =
            require("../events/socketInGameEvents/onPlayerLeave")(
                io,
                socket,
                game,
                p.me,
                gameHandler
            );
        const onMessage = require("../events/socketInGameEvents/onMessage")(
            io,
            socket,
            game,
            p.me
        );
        const onMove = require("../events/socketInGameEvents/onMove")(
            io,
            socket,
            game,
            p.me
        );
        const sendLog = require("../events/socketInGameEvents/sendLog")(
            io,
            socket,
            game
        );
        const sendPlayerJoin =
            require("../events/socketInGameEvents/sendPlayerJoin.js")(
                io,
                socket,
                game
            );
        const sendGameState =
            require("../events/socketInGameEvents/sendGameState.js")(
                io,
                socket,
                game
            );

        socket.join(game.id);
        sendPlayerJoin(game[p.me]);

        if (game.playerone != null && game.playertwo != null) {
            game.nextTurn = Math.random() < 0.5 ? "playerone" : "playertwo";
            sendGameState();
            
        }

        socket.on("move", onMove);
        socket.on("msg", onMessage);
        socket.on("disconnect", onPlayerLeave);
        socket.on("leaveGame", onPlayerLeave);
    };
};
