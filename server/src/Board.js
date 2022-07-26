class Board {
    constructor() {
        this.field2 = [
            [1, 0, 1, 0, 1, 0, 1, 0],
            [0, 1, 0, 1, 0, 1, 0, 1],
            [1, 0, 1, 0, 1, 0, 1, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, -1, 0, -1, 0, -1, 0, -1],
            [-1, 0, -1, 0, -1, 0, -1, 0],
            [0, -1, 0, -1, 0, -1, 0, -1],
        ];
        this.field = [
            [1, 0, 1, 0, 1, 0, 1, 0],
            [0, 0, 0, 1, 0, 1, 0, 1],
            [1, 0, 1, 0, 1, 0, 1, 0],
            [0, 0, 0, -1, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, -1, 0, -1, 0, -1, 0, -1],
            [-1, 0, -1, 0, -1, 0, -1, 0],
            [0, -1, 0, -1, 0, -1, 0, -1],
        ];
    }

    possibleTurns(player) {
        var jump = false;
        var turns = [];

        for(var x = 0; x < 8; x++){
            for(var y = 0; y < 8; y++){
                if (this.getField({x: x, y: y}) * player > 0) {
                    var tileJumps = this.possibleTileJumps({x: x, y: y});

                    if (!jump && tileJumps.length !== 0) {
                        jump = true;
                        turns = [];
                    }

                    if (jump) {
                        if (tileJumps.length !== 0) {
                            turns.push({ from: {x: x, y: y}, to: tileJumps });
                        }
                    } else {
                        
                        var tileMoves = this.possibleTileMoves({x: x, y: y});
                        if (tileMoves.length !== 0) {
                            turns.push({ from: {x: x, y: y}, to: tileMoves });
                        }
                    }
                }
            }
        }

        return turns;
    }

    possibleTileMoves(tile) {
        var moves = [];

        const targets = [
            { x: tile.x - 1, y: tile.y + 1 },
            { x: tile.x + 1, y: tile.y + 1 },
            { x: tile.x + 1, y: tile.y - 1 },
            { x: tile.x - 1, y: tile.y - 1 },
        ];

        targets.forEach((target) => {
            if (
                this.isFieldInBounds(target) &&
                this.isTileMovePossible(tile, target)
            ) {
                moves.push(target);
            }
        });

        return moves;
    }

    possibleTileJumps(tile) {
        var jumps = [];

        const targets = [
            { x: tile.x - 2, y: tile.y + 2 },
            { x: tile.x + 2, y: tile.y + 2 },
            { x: tile.x + 2, y: tile.y - 2 },
            { x: tile.x - 2, y: tile.y - 2 },
        ];

        targets.forEach((target) => {
            if (
                this.isFieldInBounds(target) &&
                this.isTileJumpPossible(tile, target)
            ) {
                jumps.push(target);
            }
        });

        return jumps;
    }

    getField(location) {
        return this.field[location.y][location.x];
    }

    setField(location, value) {
        this.field[location.y][location.x] = value;
    }

    isFieldInBounds(location) {
        return (
            location.x >= 0 &&
            location.x < 8 &&
            location.y >= 0 &&
            location.y < 8
        );
    }

    turn(from, to) {
        this.setField(to, this.getField(from));
        this.setField(from, 0);
        if (Math.abs(from.x - to.x) === 2) {
            this.setField(
                {
                    x: from.x + Math.floor((to.x - from.x) / 2),
                    y: from.y + Math.floor((to.y - from.y) / 2),
                },
                0
            );
        }
    }

    isTileMovePossible(from, to) {
        from.value = this.getField(from);
        to.value = this.getField(to);
        if (from.value !== 0 && to.value === 0) {
            if (from.value > 0 || Math.abs(from.value) > 1) {
                if (to.y - from.y === 1 && Math.abs(to.x - from.x) === 1) {
                    return true;
                }
            }
            if (from.value < 0 || Math.abs(from.value) > 1) {
                if (to.y - from.y === -1 && Math.abs(to.x - from.x) === 1) {
                    return true;
                }
            }
        }
        return false;
    }

    isTileJumpPossible(from, to) {
        from.value = this.getField(from);
        to.value = this.getField(to);
        if (from.value !== 0 && to.value === 0) {
            if (from.value > 0 || Math.abs(from.value) > 1) {
                if (to.y - from.y === 2 && Math.abs(to.x - from.x) === 2) {
                    if (
                        this.getField({
                            x: from.x + Math.floor((to.x - from.x) / 2),
                            y: from.y + Math.floor((to.y - from.y) / 2),
                        }) < 0
                    ) {
                        return true;
                    }
                }
            }
            if (from.value < 0 || Math.abs(from.value) > 1) {
                if (to.y - from.y === -2 && Math.abs(to.x - from.x) === 2) {
                    if (
                        this.getField({
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
}

module.exports = Board;
