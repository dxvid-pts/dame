const httpServer = require("http").createServer();
const io = require("socket.io")(httpServer, {
    cors: { origin: "*" },
});

const registerUserHandler = require("./handler/userHandler");
const constants = require("shared/constants");


function onConnection(socket){
    registerUserHandler(io, socket);
};

io.on("connection", onConnection);

httpServer.listen(constants.CONNECTION_PORT, () =>
    console.log("listening on http://localhost:" + constants.CONNECTION_PORT)
);
