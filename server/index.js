const path = require("path");

const handler = require("./handler");

const constants = require("shared/constants");

const http = require("http").createServer();

const io = require("socket.io")(http, {
    cors: { origin: "*" },
});

io.on("connection", (socket) => {
    socket.on("message", (message) => {
        console.log(message);
        io.emit("message", `${socket.id.substr(0, 2)} said ${message}`);
    });

    socket.on("joinGame", (gameid) => {
        if (typeof gameid === "string") {
            if (handler.gameExists(gameid)) {
                if (!handler.isPlayerIngame(socket.id)) {
                }
            }else{
                //report wrong game id
            }
        }
    });

    socket.on("createGame", (args) => {
        if (
            typeof args === "object" &&
            args.hasOwnProperty("public") &&
            args.hasOwnProperty("guests")
        ) {
            if (!handler.isPlayerIngame(socket.id)) {
                handler.createGame(socket.id, args.public, args.guests);
            }
        }
    });
});

http.listen(constants.CONNECTION_PORT, () =>
    console.log("listening on http://localhost:" + constants.CONNECTION_PORT)
);
