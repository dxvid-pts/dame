//rotates nextPossibleTurns
function turnNextPossibleTurns(nextPossibleTurns) {
    let newNextPossibleTurns = [];
    for (const e of nextPossibleTurns) {
        let newTo = [];
        for (const t of e.to) {
            newTo.push(turnPosition(t));
        }
        newNextPossibleTurns.push({
            from: turnPosition(e.from), to: newTo,
        });

    }
    return newNextPossibleTurns;
}

//rotates a position object
function turnPosition(position) {
    return {
        x: turnValue(position.x), y: turnValue(position.y),
    };
}

//rotates a single value
function turnValue(val) {
    const indexList = turnArray([0, 1, 2, 3, 4, 5, 6, 7]);
    return indexList[val];
}

//rotates the chessboard
function turnBoard(board) {
    let newBoard = [...board];
    turnArray(newBoard);

    //turn rows
    for (let i = 0; i < newBoard.length; i++) {
        newBoard[i] = turnArray([...newBoard[i]]);
    }

    return newBoard;
}

//rotates an array
function turnArray(array) {
    for (let i = 0; i < Math.floor(array.length / 2); i++) {
        array.swapItems(i, array.length - i - 1);
    }
    return array;
}

//swap items in an array
Array.prototype.swapItems = function (a, b) {
    this[a] = this.splice(b, 1, this[a])[0];
    return this;
};

module.exports = {
    turnNextPossibleTurns, turnValue, turnBoard,
};