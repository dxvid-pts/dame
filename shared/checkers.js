function tileInBounds(location) {
    return (
        location.x >= 0 && location.x < 8 && location.y >= 0 && location.y < 8
    );
}

function getField(board, location) {
    return board[location.y][location.x];
}

function setField(board, location, value) {
    board[location.y][location.x] = value;
}

function tileCanMoveTo(board, from, to) {
    from.value = getField(board, from);
    to.value = getField(board, to);
    if (from.value != 0 && to.value == 0) {
        if (from.value > 0 || Math.abs(from.value) > 1) {
            if (to.y - from.y == 1 && Math.abs(to.x - from.x) == 1) {
                return true;
            }
        }
        if (from.value < 0 || Math.abs(from.value) > 1) {
            if (to.y - from.y == -1 && Math.abs(to.x - from.x) == 1) {
                return true;
            }
        }
    }
    return false;
}

function tileCanJumpTo(board, from, to) {
    from.value = getField(board, from);
    to.value = getField(board, to);
    if (from.value != 0 && to.value == 0) {
        if (from.value > 0 || Math.abs(from.value) > 1) {
            if (to.y - from.y == 2 && Math.abs(to.x - from.x) == 2) {
                if (
                    getField(board, {
                        x: from.x + Math.floor((to.x - from.x) / 2),
                        y: from.y + Math.floor((to.y - from.y) / 2),
                    }) < 0
                ) {
                    return true;
                }
            }
        }
        if (from.value < 0 || Math.abs(from.value) > 1) {
            if (to.y - from.y == -2 && Math.abs(to.x - from.x) == 2) {
                if (
                    getField(board, {
                        x: from.x + Math.floor((to.x - from.x) / 2),
                        y: from.y + Math.floor((to.y - from.y) / 2),
                    }) > 0
                ) {
                    return true;
                }
            }
        }
    }
    return false;
}

function tileMoveTo(board, from, to) {
    setField(board, to, getField(board, from));
    setField(board, from, 0);
    return board;
}

function tileJumpTo(board, from, to) {
    setField(board, to, getField(board, from));
    setField(board, from, 0);
    setField(
        board,
        {
            x: from.x + Math.floor((to.x - from.x) / 2),
            y: from.y + Math.floor((to.y - from.y) / 2),
        },
        0
    );
    return board;
}

// 1 = playerone won, -1 = playertwo won, 0 = nobody won, 2 = tie
function gameIsFinished(board){
    return 0;
}

function playerCanJump(board, player){
    return false;
}

function tileCanJump(board, location){
    return false;
}



module.exports = { tileCanMoveTo, tileCanJumpTo, tileMoveTo, tileJumpTo, getField, tileInBounds, gameIsFinished, playerCanJump, tileCanJump};
