class GameHandler {
    constructor() {
        this.games = [];
        this.openGamesCount = 0;
        this.ai = null;
    }

    //returns the game with the given id
    getGameByGameID(id) {
        const game = this.games.find((game) => game.id === id);
        return game === undefined ? null : game;
    }

    //returns game by search
    getGameBySearching() {
        const game = this.games.find((game) => !game.isFull() && game.searching);
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
