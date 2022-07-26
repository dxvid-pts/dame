module.exports = (game, playerid) => {
    if (game.playerone != null) {
        if (game.playerone.socketid == playerid) {
            return {me: "playerone", enemy: "playertwo"};
        }
        if (game.playertwo != null) {
            if (game.playertwo.socketid == playerid) {
                return {me: "playertwo", enemy: "playerone"};
            }
        }
    }
};
