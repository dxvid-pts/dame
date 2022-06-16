games = [];
openGames = 0;
searchingGames = 0;

function initBoard() {
    return [
        [1, 0, 1, 0, 1, 0, 1, 0],
        [0, 1, 0, 1, 0, 1, 0, 1],
        [1, 0, 1, 0, 1, 0, 1, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, -1, 0, -1, 0, -1, 0, -1],
        [-1, 0, -1, 0, -1, 0, -1, 0],
        [0, -1, 0, -1, 0, -1, 0, -1],
    ];
}

function createGame(player, visible, guests) {
    openGames++;
    if (visible) {
        searchingGames++;
    }
    const id = (openGames.toString() + Math.floor(Math.random() * 10000))
        .substring(0, 5)
        .toString();
    games.push({
        id: id,
        board: initBoard(),
        playerone: player,
        playertwo: null,
        moves: [],
        visible: visible,
        guests: guests,
    });
    return getGameByID(id);
}

function joinGame(player, gameid) {
    var game = getGameByID(gameid);
    join = (gameplayer) => {
        if (game[gameplayer] == null) {
            if (game.visible) {
                searchingGames--;
            }
            game[gameplayer] = player;
            return true;
        }
        return false;
    };
    return join("playerone") || join("playertwo");
}

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

function gameExists(gameid) {
    return getGameByID(gameid) != null;
}

function isPlayerIngame(player) {
    return getGameByPlayerID(player) != null;
}


module.exports = { createGame, joinGame, gameExists, isPlayerIngame, getGameByID };
