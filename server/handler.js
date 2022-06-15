games = [];
openGames = 0;
searchingGames = 0;

function initBoard(){
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

function createGame(player, public, guests){
    openGames++;
    const id = (openGames.toString() + Math.floor(Math.random()*10000)).substring(0,5).toString();
    games.push({
        id: id,
        board: initBoard(),
        playerone: player,
        playertwo: null,
        moves: [],
        public: public,
        guests: guests
    });
    console.log("Player "+ player + " created Game " + id);
    return id;
}

function joinGame(gameid, player) {
    i = rooms.map((val) => val.id).indexOf(roomid);

    if (i < 0) {
        return -1;
    }
    if (rooms[i].player2 != null) {
        return -2;
    }
    rooms[i].player2 = playerid;
    return 0;
}

function getGameByPlayer(player){
    return games.find(game => game.playerone === player || game.playertwo === player);
}

function getGameByID(gameid){
    return games.find(game => game.id === gameid);
}

function gameExists(gameid){
    return getGameByID(gameid) != null;
}

function isPlayerIngame(player){
    return getGameByPlayer(player) != null;
}

module.exports = {createGame, gameExists, isPlayerIngame};
