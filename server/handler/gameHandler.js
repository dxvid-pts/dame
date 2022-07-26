class GameHandler {
    

    constructor(){
        this.games = [];
        this.openGamesCount = 0;
        this.searchingGamesCount = 0;
    }

    /* DEPRECATED
    getGameBySocketID(socketid) {
        checkPlayer = (gameplayer) => {
            return gameplayer != null && gameplayer.socketid === socketid;
        };
        return games.find(
            (game) => checkPlayer(game.playerone) || checkPlayer(game.playertwo)
        );
    }*/

    getGameByGameID(gameid) {
        return this.games.find((game) => game.id === gameid);
    }

    getGameByFirstNotFull(){
        return this.games.find((game) => !game.isFull());
    }

    addGame(game){
        this.games.push(game);
        this.openGamesCount++;
    }

    removeGame(game){
        this.games = this.games.filter( obj => obj.id !== game.id);
        this.openGamesCount--;
    }
    
    getOpenGamesCount(){
        return this.openGamesCount;
    }

    getSearchingGamesCount(){
        return this.searchingGamesCount;
    }
}

module.exports = GameHandler;