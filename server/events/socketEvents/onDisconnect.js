module.exports = (io, socket) => {
    return (args) => {
        console.log("Player "+socket.id+" disconnected");
    };
};
