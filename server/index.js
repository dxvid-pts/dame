import {joinRoom} from "utils/rooms";

const Constants = require("shared/constants")

const http = require('http').createServer();

const io = require('socket.io')(http, {
    cors: {origin: "*"}
});

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('message', (message) => {
        console.log(message);
        io.emit('message', `${socket.id.substr(0, 2)} said ${message}`);
    });

    socket.on('join', (room) => {
        if(room == null){
            //send back a created room with id!
        }
        
        console.log(socket.id);
        tryJoin = joinRoom(room, socket.id);

        //send back result of joinRoom and cick user if it fails


    });

});

http.listen(Constants.CONNECTION_PORT, () => console.log('listening on http://localhost:' + Constants.CONNECTION_PORT));