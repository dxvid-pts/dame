module.exports = (game, player_key, gameHandler) => {

    game[player_key] = null;
    if(game.playerone == null && game.playertwo == null){
        console.log("Game "+game.id+ " closed");
        gameHandler.removeGame(game);
    }
};
