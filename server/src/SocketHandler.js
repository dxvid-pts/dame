module.exports = (io, socket, gameHandler) => {
    const isValidObject = require("./utils/isValidObject.js");
    const Game = require("./Game.js");

    var game = null;
    var player = { id: socket.id, nick: null, tile: null};

    io.to(socket.id).emit("socketid", socket.id);
    console.log("Player " + socket.id + " connected");

    socket.on("joinGame", onJoinGame);
    socket.on("createGame", onCreateGame);
    socket.on("spectateGame", onSpectateGame);
    socket.on("disconnect", onDisconnect);

    socket.on("move", onMove);
    socket.on("msg", onMessage);
    socket.on("disconnect", onLeaveGame);
    socket.on("leaveGame", onLeaveGame);

    function handleJoin() {
        socket.join(game.id);
        sendPlayerJoin();

        // ILLEGAL!!
        if (game.isFull()) {
            game.start();
            sendGameState();
        }

        console.log("Player " + socket.id + " joined Game " + game.id);
    }

    //listeners

    function onJoinGame(args) {
        if (!isValidObject(args, ["nick", "gameid"]) || game !== null) {
            return;
        }

        if (args.gameid === "RANDOM") {
            game = gameHandler.getGameBySearching();

            if (game === null) {
                game = new Game(
                    gameHandler.generateGameID(),
                    args.spectatable,
                    true
                );
                gameHandler.addGame(game);
            }
        } else {
            game = gameHandler.getGameByGameID(args.gameid);

            if (game === null) {
                sendError(
                    13,
                    "Cannot join Game. Game " + args.gameid + " does not exist."
                );
                return;
            }

            if (game.isFull()) {
                game = null;
                sendError(
                    14,
                    "Cannot join Game. Game " + args.gameid + "  is full."
                );
                return;
            }
        }

        player.nick = args.nick;
        game.join(player);
        handleJoin();
    }

    function onCreateGame(args) {
        if (!isValidObject(args, ["nick", "spectatable", "guests"])) {
            return;
        }

        if (game !== null) {
            sendError(21, "Cannot create Game. Your are already in a Game.");
            return;
        }

        game = new Game(
            gameHandler.generateGameID(),
            args.spectatable,
            false
        );
        gameHandler.addGame(game);
        
        player.nick = args.nick;
        game.join(player);
        handleJoin();
    }

    function onSpectateGame(args) {
        if (!isValidObject(args, ["gameid"])) {
            return;
        }

        game = gameHandler.getGameByID(args.gameid);

        if (game === null) {
            sendError(
                13,
                "Cannot join Game. Game " + args.gameid + " does not exist."
            );
            return;
        }

        if (!game.spectatable) {
            sendError(
                13,
                "Cannot spectate Game. Game " + args.gameid + " is private."
            );
            return;
        }

        socket.join(game.id);
    }

    function onDisconnect() {
        console.log("Player " + socket.id + " disconnected");
    }

    // fixc when player leavers and new player joines update nextturn !!
    // Dame erstellen fix

    
    function onMove(args) {
        if (
            !isValidObject(args, ["from", "to"]) ||
            game == null ||
            !isValidObject(args.from, ["x", "y"]) ||
            !isValidObject(args.to, ["x", "y"])
        ) {
            return;
        }

        if (game.nextTurnPlayer !== player) {
            sendError(40, "Cannot move. It is not your turn.");
            return;
        }

        if (!game.isTurnAllowed(args.from, args.to)) {
            sendError(41, "Cannot move. This is not allowed.");
            return;
        }

        game.takeTurn(args.from, args.to);
        
        sendGameState();
    }

    function onMessage(args) {
        if (!isValidObject(args, ["msg"]) || game === null) {
            return;
        }
        sendMessage(args.msg, player);
    }

    function onLeaveGame() {
        if (game == null) {
            return;
        }

        socket.leave(game.id);
        game.leave(player);

        console.log("Player " + socket.id + " left Game " + game.id);

        if (game.isEmpty()) {
            gameHandler.removeGame(game);
        }

        sendPlayerLeave(player);

        game = null;
    }

    //send

    function sendError(code, msg) {
        var obj = {
            code: code,
            msg: msg,
            time: Date.now(),
        };
        //#console.log(obj);
        io.to(socket.id).emit("error", obj);
    }

    function sendGameState() {
        var obj = {
            board: game.board.field,
            turns: game.turns,
            nextTurnPlayer: game.nextTurnPlayer,
            nextPossibleTurns: game.nextPossibleTurns,
            winner: game.winner,
            time: Date.now(),
        };
        //#console.log(obj);
        io.in(game.id).emit("gameState", obj);
    }

    function sendPlayerJoin() {
        var obj = {
            game: game.id,
            player: player,
            time: Date.now(),
        };
        //#console.log(obj);
        io.in(game.id).emit("playerJoin", obj);
    }

    function sendPlayerLeave() {
        var obj = {
            player: player,
            time: Date.now(),
        };
        //#console.log(obj);
        io.in(game.id).emit("playerLeave", obj);
    }

    function sendMessage(msg) {
        var obj = {
            msg: msg,
            player: player,
            time: Date.now(),
        };
        //#console.log(obj);
        io.in(game.id).emit("msg", obj);
    }
};
