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

    //start gane
    start() {
        this.nextTurnPlayer = this.enemy;
        this.nextPossibleTurns = this.board.possibleTurns(this.nextTurnPlayer.tile);
    }

    //handles player join
    join(player) {
        player.active = true;

        if (this.player === null && this.enemy === null) {
            let r = Math.random();
            if (r > 0.5) {
                this.player = player;
                this.player.tile = 1;
            } else {
                this.enemy = player;
                this.enemy.tile = -1;
            }
        } else if (this.player === null) {
            this.player = player;
            this.player.tile = 1;
        } else if (this.enemy === null) {
            this.enemy = player;
            this.enemy.tile = -1;
        } else if (this.player.id === player.id) {
            this.player.active = true;
        } else if (this.enemy.id === player.id) {
            this.enemy.active = true;
        }

        if (this.player != null) {
            if (this.player.nick == "AI") {
                console.log("Player is" + this.player.tile)
            }
        }
        if (this.enemy != null) {
            if (this.enemy.nick == "AI") {
                console.log("Enemy is" + this.enemy.tile)
            }
        }
        

    }

    //handles player leave
    leave(player) {
        if (this.player !== null && this.player.id === player.id) {
            this.player.active = false;
        } else if (this.enemy !== null && this.enemy.id === player.id) {
            this.enemy.active = false;
        }
    }

    //handles player turn check
    isTurnAllowed(from, to) {
        let tile = this.nextPossibleTurns.find((location) => location.from.x === from.x && location.from.y === from.y);
        tile = tile === undefined ? null : tile;

        if (tile === null) {
            return false;
        }

        let tile_to = tile.to.find((location) => location.x === to.x && location.y === to.y);
        tile_to = tile_to === undefined ? null : tile_to;

        return tile_to !== null;
    }

    //handles player turn
    takeTurn(from, to) {
        this.board.turn(from, to);

        //wenn gleicher spieler geschlagen hat und nochmal schlagen kann
        if (Math.abs(from.x - to.x) === 2 && this.board.possibleTileJumps(to).length !== 0) {
            this.nextPossibleTurns = [{from: to, to: this.board.possibleTileJumps(to)},];
        } else {
            this.nextTurnPlayer = this.nextTurnPlayer === this.player ? this.enemy : this.player;
            this.nextPossibleTurns = this.board.possibleTurns(this.nextTurnPlayer.tile);
        }

        if (this.nextPossibleTurns.length === 0) {
            this.winner = this.nextTurnPlayer === this.player ? this.enemy : this.player;
            this.nextTurnPlayer = null;
        }

        this.turnes.push({from: from, to: to, time: Date.now()});
    }

    isFull() {
        return this.player !== null && this.enemy !== null;
    }

    isEmpty() {
        return this.player === null && this.enemy === null;
    }

    isPassive() {
        if (!this.isEmpty() && !((this.player !== null && this.player.active) || (this.enemy !== null && this.enemy.active))) {
            return true;
        } else {
            return false;
        }
    }

    canJoin(player) {
        if (!this.isFull()) {
            return true;
        } else if (this.player.id === player.id) {
            return true;
        } else if (this.enemy.id === player.id) {
            return true;
        } else {
            return false;
        }
    }
}

module.exports = Game;
