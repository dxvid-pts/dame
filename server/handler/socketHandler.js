module.exports = (io, socket, gameHandler) => {
    const isValidObject = require("../utils/isValidObject.js");
    const Game = require("./Game.js");

    var game = null;
    var player = { id: socket.id, key: null, nick: null };

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
        sendPlayerJoin(player);

        // ILLEGAL!!
        if (game.isFull()) {
            game.nextTurn = Math.random() < 0.5 ? "playerone" : "playertwo";
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

            if(game === null){
                game = new Game.TwoPlayerGame(gameHandler.generateGameID(), args.spectatable, true);
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


        game = new Game.TwoPlayerGame(gameHandler.generateGameID(), args.spectatable, false);
        gameHandler.addGame(game);

        game.join(player);
        handleJoin();
    }

    function onSpectateGame(args) {
        if (!isValidObject(args, ["gameid"])) {
            return;
        }

        game = gameHandler.getGameByID(args.gameid);

        if (game == null) {
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

    function onMove(args) {
        if (
            !isValidObject(args, ["move"]) ||
            !isValidObject(args.move, ["from", "to"]) ||
            game == null ||
            !isValidObject(args.move.from, ["x", "y"]) ||
            !isValidObject(args.move.to, ["x", "y"])
        ) {
            return;
        }
        if (game.nextTurn !== player) {
            sendError(40, "Cannot move. It is not your turn.");
            return;
        }

        if (!executeMove(game, args.move)) {
            sendError(41, "Cannot move. This is not allowed.");
            return;
        }

        winner = checkers.gameIsFinished(game.board);
        if (winner != 0) {
            game.nextTurn = null;
            if (winner != 2) {
                game.winner = 1 == winner ? "playerone" : "playertwo";
            }
        }
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
        io.to(socket.id).emit("error", {
            code: code,
            msg: msg,
            time: Date.now(),
        });
    }

    function sendGameState() {
        io.in(game.id).emit("gameState", {
            board: game.board,
            moves: game.moves,
            nextTurn: game[game.nextTurn],
            winner: game[game.winner],
            time: Date.now(),
        });
    }

    function sendPlayerJoin() {
        io.in(game.id).emit("playerJoin", {
            game: game.id,
            player: player,
            time: Date.now(),
        });
    }

    function sendPlayerLeave() {
        io.in(game.id).emit("playerLeave", {
            player: player,
            time: Date.now(),
        });
    }
};
