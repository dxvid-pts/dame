class GameHandler {
    constructor() {
        this.games = [];
        this.openGamesCount = 0;
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

    getGameByGameID(id) {
        var game = this.games.find((game) => game.id === id);
        return game === undefined ? null : game;
    }

    getGameBySearching() {
        var game = this.games.find((game) => !game.isFull() && game.searching);
        return game === undefined ? null : game;
    }

    addGame(game) {
        this.games.push(game);
        this.openGamesCount++;
        console.log("Game " + game.id + " was created");
    }

    removeGame(game) {
        this.games = this.games.filter((obj) => obj.id !== game.id);
        this.openGamesCount--;

        console.log("Game " + game.id + " was removed");
    }

    generateGameID() {
        return (
            this.openGamesCount.toString() +
            Math.floor(Math.random() * 10000)
        )
            .substring(0, 5)
            .toString();
    }

    getOpenGamesCount() {
        return this.openGamesCount;
    }

    getSearchingGamesCount() {
        return this.searchingGamesCount;
    }
}

module.exports = GameHandler;
