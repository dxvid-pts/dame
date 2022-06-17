module.exports = (game, playerid) => {
    if (game.playerone != null) {
        if (game.playerone.id == playerid) {
            return "playerone";
        }
        if (game.playertwo != null) {
            if (game.playertwo.id == playerid) {
                return "playertwo";
            }
        }
    }
};
