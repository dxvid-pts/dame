module.exports = (io, socket) => {
    return (code, msg) =>
        io
            .to(socket.id)
            .emit("error", { code: code, msg: msg, time: Date.now() });
};
