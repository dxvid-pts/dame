module.exports = (game, player) => {
    join = (gameplayer) => {
        if (game[gameplayer] == null) {
            game[gameplayer] = player;
            return true;
        }
        return false;
    };
    return join("playerone") || join("playertwo");
};
