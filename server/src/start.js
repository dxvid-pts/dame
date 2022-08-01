const httpServer = require("http").createServer();
const io = require("socket.io")(httpServer, {
    cors: {origin: "*"},
});

const GameHandler = require("./GameHandler");
const socketHandler = require("./SocketHandler");
const gameHandler = new GameHandler();

function onConnection(socket) {
    socketHandler(io, socket, gameHandler);
}

io.on("connection", onConnection);

httpServer.listen(4000, () => console.log("listening on http://localhost:" + 4000));
