module.exports = () => {
    games = [];
    openGames = 0;
    searchingGames = 0; // not used!!!

    function getGameBySocketID(socketid) {
        checkPlayer = (gameplayer) => {
            return gameplayer != null && gameplayer.socketid === socketid;
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

    function removeGame(game){
        games = games.filter( obj => obj.id !== game.id)
    }

    return {addNewGame, getOpenGames, getGameBySocketID, getGameByID, removeGame};
};
