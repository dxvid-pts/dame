# CHECKERS ONLINE

An online game to play dame with your friends and other players. If you want to go the extra mile, try to beat the AI!  
The AI was developed on [Google Colab](https://colab.research.google.com/drive/17xtttdlepZ1xYUaP-f_Zw8k797lAug3T?usp=sharing).

## Overview

The project is organized in three components.
- client
- server
- ai

The client is a webserver using node.js and React serving the website for the players.
The server is a webserver using node.js and socket.io enabling real time communication and cheating protected playing.
The ai is a python program using a socket connection to connect to the server enabling players to play against a neural-network trained artificial intelligence.


## Installation

The easiest way to install and run Checkers Online is using `docker-compose`.
Navigate into the root folder of Checkers Online and run `docker-compose up`.
If you do not want to use docker you are also able to manually install each component by navigating in it's folder and following the steps shown in `Dockerfile`.

### WARNING

Using gitpod to run this program is currently not possible. This is a result of gitpod adding the port number in front of the domain name. This results in a problem where the client cannot establish a socket connection to the server.

## Documentation

### Client


### Server

To use the server you need to establish a socket connection. Once established the server will respond to you with your Socket-ID. This is important for late when you are ingame.

#### Querys

Each query you can send to the server with its requirements.

##### "joinGame"  requires JSON {nick, gameid}

Checks if the game of gameid exists or if the gameid is specified as "RANDOM". If so it either connects to a open random game or if the game of gameid is not already full joins the game.

##### "createGame" requires JSON {nick, spectatable}

Creates a new game with a random gameid. Spectatable specifies if other people can watch the game, but is currently not implemented.

##### "move" requires JSON {from, to}

If you are ingame it checks if its your turn and if your move is allowed. If so it updates the gamestate.

##### "message" requires JSON {msg}

If you are ingame it sends the message to all people in the current game.

##### "leaveGame" requires JSON {}

If you are ingame it disconnects you from the game and informs the other people that you left. Only you are able to reconnect to the game. If there are no active players left in the game the game is deleted.

#### Responses

Each response the server sends depending on your previous action.

##### "error" sends JSON {code, msg, time}

If you send a illegal request you will be informed.

##### "gameState" sends JSON {board, turns, nextTurnPlayer, nextPossibleTurns, winner, time}

Each time the gameState changes it sends it to all connected players. `nextTurnPlayer` specifies whos turn it is, all possible turns are listed in `nextPossibleTurns`. If no turns are possible the winner is selected. You know if its your turn by looking at `nextTurnPlayer.id` it will match your Socket ID.

##### "playerJoin" sends JSON {game, player, time}

If you are another player joins your game you will be informed. `game` specifies the Game ID which can be used to connect to the game. `player` specifies who joined.

##### "playerLeave" sends JSON {player, time}

Informs you that a player left your game.

##### "msg" sends JSON {msg, player, time}

Each time somebody in your game sends a message you will be informed.



