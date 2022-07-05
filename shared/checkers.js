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
function gameIsFinished(board) {
    return 0;
}

function playerCanJump(board, player) {
    return false;
}

function tileCanJump(board, location) {
    return false;
}

// NEW

function possiblePlayerTurns(board, player) {
    var jump = false;
    var turns = [];

    for (x = 0; x < 8; x++) {
        for (y = 0; y < 8; y++) {
            location = { x: x, y: y };

            if (player * getField(board, location) <= 0) {
                continue;
            }

            jump_targets = [
                { x: x - 2, y: y + 2 },
                { x: x + 2, y: y + 2 },
                { x: x - 2, y: y - 2 },
                { x: x - 2, y: y - 2 },
            ];

            tileTurns = possibleTileTurns(
                board,
                location,
                jump_targets,
                tileCanJumpTo
            );
            if (tileTurns.length !== 0) {
                jump = true;
            }

            if (jump) {
                turns = turns.concat(tileTurns);
                continue;
            }

            move_targets = [
                { x: x - 1, y: y + 1 },
                { x: x + 1, y: y + 1 },
                { x: x - 1, y: y - 1 },
                { x: x - 1, y: y - 1 },
            ];

            tileTurns = possibleTileTurns(
                board,
                location,
                move_targets,
                tileCanMoveTo
            );

            turns = turns.concat(tileTurns);
        }
    }
    return turns;
}

function possibleTileTurns(board, location, targets, tileCanTurnTo) {
    turns = [];

    targets.forEach((target) => {
        if (tileInBounds(target) && tileCanTurnTo(board, location, target)) {
            turns.push({ from: location, to: target });
        }
    });

    return turns;
}

module.exports = {
    tileCanMoveTo,
    tileCanJumpTo,
    tileMoveTo,
    tileJumpTo,
    getField,
    tileInBounds,
    gameIsFinished,
    playerCanJump,
    tileCanJump,
    possiblePlayerTurns,
};
