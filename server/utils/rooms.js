rooms = [
    { id: 1, player1: 100, player2: null },
    { id: 2, player1: 100, player2: 100 },
];

function joinRoom(roomid, playerid) {
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

export default { joinRoom };
