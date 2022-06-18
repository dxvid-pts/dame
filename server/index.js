const httpServer = require("http").createServer();
const io = require("socket.io")(httpServer, {
    cors: { origin: "*" },
});


const gameHandler = require("./handler/gameHandler")();
const registerSocketHandler = require("./handler/socketHandler");
const constants = require("shared/constants");


function onConnection(socket){
    registerSocketHandler(io, socket, gameHandler);
};

io.on("connection", onConnection);

httpServer.listen(constants.CONNECTION_PORT, () =>
    console.log("listening on http://localhost:" + constants.CONNECTION_PORT)
);
