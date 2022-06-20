module.exports = (io, socket, game, iam) => {

    const sendMessage = require("./sendMessage")(io, socket, game);
    const isValidObject = require("../../utils/isValidObject.js");


    return (args) => {
        if (isValidObject(args, ["msg"])) {
            sendMessage(args.msg, game[iam]);
        }
    };
};
