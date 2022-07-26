const httpServer = require("http").createServer();
const io = require("socket.io")(httpServer, {
    cors: { origin: "*" },
});

const GameHandler = require("./handler/gameHandler");
const socketHandler = require("./handler/socketHandler");
const constants = require("shared/constants");
const gameHandler = new GameHandler();

function onConnection(socket){
    socketHandler(io, socket, gameHandler);
};

io.on("connection", onConnection);

httpServer.listen(constants.CONNECTION_PORT, () =>
    console.log("listening on http://localhost:" + constants.CONNECTION_PORT)
);
