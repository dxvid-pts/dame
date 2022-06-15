const path = require("path");

const handler = require("./handler");
const constants = require("shared/constants");
const actions = require("./actions");

const http = require("http").createServer();

const io = require("socket.io")(http, {
    cors: { origin: "*" },
});

io.on("connection", (socket) => {
    console.log("Player " + socket.id + " connected");

    socket.on("joinGame", (args) => {
        if (typeof args === "object" &&
        args.hasOwnProperty("gameid") &&
        args.hasOwnProperty("nick")) {
            if (handler.gameExists(args.gameid)) {
                if (!handler.isPlayerIngame(socket.id)) {
                    if (handler.joinGame({id: socket.id, nick: args.nick}, args.gameid)) {
                        console.log("Player " + socket.id + " joined Game " + args.gameid);
                        actions.initPlayer(io, socket,  handler.getGameByID(args.gameid));
                    }else{
                        actions.reportError(io, socket, 1, "Cannot join. Game "+ args.gameid+"  is full.");
                    }
                }
            } else {
                actions.reportError(io, socket, 2, "Cannot join. Game "+ args.gameid+" does not exist.");
            }
        }
    });

    socket.on("createGame", (args) => {
        if (
            typeof args === "object" &&
            args.hasOwnProperty("public") &&
            args.hasOwnProperty("guests") &&
            args.hasOwnProperty("nick")
        ) {
            if (!handler.isPlayerIngame(socket.id)) {
                game = handler.createGame(
                    {id: socket.id, nick: args.nick},
                    args.public,
                    args.guests
                );
                console.log("Player " + socket.id + " created Game " + game.id);
                actions.initPlayer(io, socket, game);
            }else{
                actions.reportError(io, socket, 3, "Cannot create Game. Your are ingame.");
            }
        }
    });
});

http.listen(constants.CONNECTION_PORT, () =>
    console.log("listening on http://localhost:" + constants.CONNECTION_PORT)
);
