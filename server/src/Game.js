const Board = require("./Board");

class Game {
    constructor(id, spectatable, searching) {
        this.id = id;
        this.spectatable = spectatable;
        this.searching = searching;

        this.board = new Board();
        this.turnes = [];

        this.player = null;
        this.winner = null;

        this.nextTurnPlayer = null;
        this.nextPossibleTurns = null;
        this.enemy = null;
    }

    start() {
        this.nextTurnPlayer = Math.random() < 0.5 ? this.player : this.enemy;
        this.nextPossibleTurns = this.board.possibleTurns(
            this.nextTurnPlayer.tile
        );
    }

    join(player) {
        if (this.player === null) {
            this.player = player;
            this.player.tile = 1;
        } else if (this.enemy === null) {
            this.enemy = player;
            this.enemy.tile = -1;
        }
    }

    leave(player) {
        if (this.player === player) {
            this.player = null;
        } else if (this.enemy === player) {
            this.enemy = null;
        }
    }

    isTurnAllowed(from, to) {
        let tile = this.nextPossibleTurns.find(
            (location) =>
                location.from.x === from.x && location.from.y === from.y
        );
        tile = tile === undefined ? null : tile;

        if (tile === null) {
            return false;
        }

        let tile_to = tile.to.find(
            (location) => location.x === to.x && location.y === to.y
        );
        tile_to = tile_to === undefined ? null : tile_to;

        return tile_to !== null;


    }

    takeTurn(from, to) {
        this.board.turn(from, to);

        //wenn gleicher spieler geschlagen hat und nochmal schlagen kann
        if (
            Math.abs(from.x - to.x) === 2 &&
            this.board.possibleTileJumps(to).length !== 0
        ) {
            this.nextPossibleTurns = [
                { from: to, to: this.board.possibleTileJumps(to) },
            ];
        } else {
            this.nextTurnPlayer =
                this.nextTurnPlayer === this.player ? this.enemy : this.player;
            this.nextPossibleTurns = this.board.possibleTurns(
                this.nextTurnPlayer.tile
            );
        }

        if (this.nextPossibleTurns.length === 0) {
            this.winner =
                this.nextTurnPlayer === this.player ? this.enemy : this.player;
            this.nextTurnPlayer = null;
        }

        this.turnes.push({ from: from, to: to, time: Date.now() });
    }

    isFull() {
        return this.player !== null && this.enemy !== null;
    }

    isEmpty() {
        return this.player === null && this.enemy === null;
    }
}

module.exports = Game;
