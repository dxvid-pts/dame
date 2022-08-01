module.exports = (io, socket, gameHandler) => {
    const isValidObject = require("./utils/isValidObject.js");
    const Game = require("./Game.js");

    let game = null;
    const player = {id: socket.id, nick: null, tile: null};

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

    socket.on("connectAI", connectAI);

    function handleJoin() {
        socket.join(game.id);
        sendPlayerJoin();

        if (game.isFull()) {
            game.start();
            if (game.nextTurnPlayer.Id === gameHandler.ai.id) {
                console.log("Sending move to AI")
                io.to(gameHandler.ai).emit("request", {
                    id: game.id,
                    board: game.board.field,
                    nextTurnPlayer: game.nextTurnPlayer,
                    nextPossibleTurns: game.nextPossibleTurns,
                });
            }
        }
     
        sendGameState();
        console.log("Player " + socket.id + " joined Game " + game.id);
    }

    //listeners

    function connectAI(args) {
        console.log("Started " + args)
        if (args === "LUIS_NEUMEIER") {
            gameHandler.ai = socket.id;

            player.nick = "Artificial Intelligence";

            console.log("AI connected with ID  " + socket.id + ".");

            socket.on("return", (args) => {
                console.log(args)
                
                args = JSON.parse(args);
                if (
                    !isValidObject(args, ["id", "from", "to"]) ||
                    !isValidObject(args.from, ["x", "y"]) ||
                    !isValidObject(args.to, ["x", "y"])
                ) {
                    sendError(44, "Illegale Argumente.");
                    return;
                }

                game = gameHandler.getGameByGameID(args.id);

                if(game === null){
                    sendError(45, "Spiel existiert nicht.");


                    return;
                }

                onMove({from: args.from, to: args.to});
            });
        }
    }

    function onJoinGame(args) {
        if (!isValidObject(args, ["nick", "gameid"]) || game !== null) {
            return;
        }

        if (args.gameid === "AI") {
            if (gameHandler.ai === null) {
                sendError(500, "AI is currently not available.");
            } else if (game === null) {
                console.log("Creating game for AI")
                game = new Game(
                    gameHandler.generateGameID(),
                    args.spectatable,
                    false
                );
                game.join({
                    id: gameHandler.ai, nick: "Artificial Intelligence", tile: null,
                });
                gameHandler.addGame(game);
            }
        } else if (args.gameid === "RANDOM") {
            game = gameHandler.getGameBySearching();

            if (game === null) {
                game = new Game(gameHandler.generateGameID(), args.spectatable, true);
                gameHandler.addGame(game);
            }
        } else {
            game = gameHandler.getGameByGameID(args.gameid);

            if (game === null) {
                sendError(13, "Cannot join Game. Game " + args.gameid + " does not exist.");
                return;
            }

            if (!game.canJoin(player)) {
                game = null;
                sendError(14, "Cannot join Game. Game " + args.gameid + "  is full.");
                return;
            }
        }

        player.nick = args.nick;
        game.join(player);
        handleJoin();
    }

    function onCreateGame(args) {
        if (!isValidObject(args, ["nick", "spectatable"])) {
            return;
        }

        if (game !== null) {
            sendError(21, "Cannot create Game. Your are already in a Game.");
            return;
        }

        game = new Game(gameHandler.generateGameID(), args.spectatable, false);
        gameHandler.addGame(game);

        player.nick = args.nick;
        game.join(player);
        handleJoin();
    }

    //currently disabled, can be activated in the future but requires more code to work
    function onSpectateGame(args) {
        return;

        if (!isValidObject(args, ["gameid"])) {
            return;
        }

        game = gameHandler.getGameByID(args.gameid);

        if (game === null) {
            sendError(13, "Cannot join Game. Game " + args.gameid + " does not exist.");
            return;
        }

        if (!game.spectatable) {
            sendError(13, "Cannot spectate Game. Game " + args.gameid + " is private.");
            return;
        }

        socket.join(game.id);
    }

    function onDisconnect() {
        if (socket.id === gameHandler.ai) {
            gameHandler.ai = null;
            console.log("AI " + socket.id + " disconnected");
        } else {
            console.log("Player " + socket.id + " disconnected");
        }
    }

    function onMove(args) {
        if (!isValidObject(args, ["from", "to"]) || game == null || !isValidObject(args.from, ["x", "y"]) || !isValidObject(args.to, ["x", "y"])) {
            return;
        }

        if (game.nextTurnPlayer === null || game.nextTurnPlayer.id !== player.id) {
            sendError(40, "Cannot move. It is not your turn.");
            return;
        }

        if (!game.isTurnAllowed(args.from, args.to)) {
            sendError(41, "Cannot move. This is not allowed.");
            return;
        }

        game.takeTurn(args.from, args.to);

        if (
            game.nextTurnPlayer !== null &&
            game.nextTurnPlayer.id === gameHandler.ai
        ) {
            console.log("Sending move to AI")
            io.to(gameHandler.ai).emit("request", {
                id: game.id,
                board: game.board.field,
                nextTurnPlayer: game.nextTurnPlayer,
                nextPossibleTurns: game.nextPossibleTurns,
            });
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
        if (game === null) {
            return;
        }

        socket.leave(game.id);
        game.leave(player);

        console.log("Player " + socket.id + " left Game " + game.id);

        if (game.isEmpty() || game.isPassive()) {
            gameHandler.removeGame(game);
        }

        sendPlayerLeave(player);

        game = null;
    }

    //send

    function sendError(code, msg) {
        const obj = {
            code: code, msg: msg, time: Date.now(),
        };
        //#console.log(obj);
        io.to(socket.id).emit("error", obj);
    }

    function sendGameState() {
        const obj = {
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
        const obj = {
            game: game.id, player: player, time: Date.now(),
        };
        //#console.log(obj);
        io.in(game.id).emit("playerJoin", obj);
    }

    function sendPlayerLeave() {
        const obj = {
            player: player, time: Date.now(),
        };
        //#console.log(obj);
        io.in(game.id).emit("playerLeave", obj);
    }

    function sendMessage(msg) {
        const obj = {
            msg: msg, player: player, time: Date.now(),
        };
        //#console.log(obj);
        io.in(game.id).emit("msg", obj);
    }
};
