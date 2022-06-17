module.exports = () => {
    games = [];
    openGames = 0;
    searchingGames = 0; // not used!!!

    function getGameByPlayerID(playerid) {
        checkPlayer = (gameplayer) => {
            return gameplayer != null && gameplayer.id === playerid;
        };
        return games.find(
            (game) => checkPlayer(game.playerone) || checkPlayer(game.playertwo)
        );
    }

    function getGameByID(gameid) {
        return games.find((game) => game.id === gameid);
    }

    function addNewGame(game){
        games.push(game);
        openGames++;
    }

    function getOpenGames(){
        return openGames;
    }

    return {addNewGame, getOpenGames, getGameByPlayerID, getGameByID};
};
