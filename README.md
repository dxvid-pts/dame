# CHECKERS ONLINE

An online game to play dame with your friends and other players. If you want to go the extra mile, try to beat the AI!  
The AI was developed
on [Google Colab](https://colab.research.google.com/drive/17xtttdlepZ1xYUaP-f_Zw8k797lAug3T?usp=sharing).

## Overview

The project is organized in three components.

- client
- server
- ai

The client is a webserver using node.js and React serving the website for the players.
The server is a webserver using node.js and socket.io enabling real time communication and cheating protected playing.
The ai is a python program using a socket connection to connect to the server enabling players to play against a
neural-network trained artificial intelligence.

## Outline 

| [Overview](https://github.com/DHBW-Vilas/dame/edit/master/README.md#overview)  |
|---|
|  [Installation](https://github.com/DHBW-Vilas/dame/edit/master/README.md#installation) |
| [Features](https://github.com/DHBW-Vilas/dame/edit/master/README.md#projektfeatures)  |
| [Documentation](https://github.com/DHBW-Vilas/dame/edit/master/README.md#documentation)  |

## Installation

The easiest way to install and run Checkers Online is using `docker-compose`.
Navigate into the root folder of Checkers Online and run `docker-compose up`.
If you do not want to use docker you are also able to manually install each component by navigating in it's folder and
following the steps shown in `Dockerfile`.

### WARNING

Using gitpod to run this program is currently not possible. This is a result of gitpod adding the port number in front
of the domain name. This results in a problem where the client cannot establish a socket connection to the server.

## Projektfeatures

### Programmcode

<table>
  <thead>
    <tr>
      <th>Vorgabe</th>
      <th>Umsetzung</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Verzeichnisse</td>
      <td>Aufteilung des Projektes in die Verzeichisse client, ai und server. Diese wurden überlegt in weitere Unterverzeichnisse für eine bessere Organisation aufgeteilt.</td>
    </tr>
    <tr>
      <td>Dateistruktur</td>
      <td>Einzelne React-Komponenten wurden in eigene Dateinen ausgelagert. Ausgenommen wurden Komponenten bei denen es Sinn macht sie in einer Datei zu lagern, beispielsweise sollten sie zusammengehören oder eine enge Relation haben.</td>
    </tr>
    <tr>
        <td>Kommentare</td>
        <td>Über jeder Komponente finden sich Kommentare.</td>
    </tr>
<tr>
        <td>Formatierung</td>
        <td>Jede Datei wurde automatisch mittels WebStorm formatiert.</td>
    </tr>
<tr>
        <td>Gliederung</td>
        <td>Es wurde ein großer Fokus darauf gelegt, jede Komponente in Unterkomponenten und Funktion in Unterfunktionen auzuteilen wo es Programmier- und Performancetechnisch Sinn gemacht hat.</td>
    </tr>
<tr>
        <td>Programmiertechnik</td>
        <td>Große Wertlegung in State-of-the-Art Frameworks wie React und Techniken wie Tensorflow/KI</td>
    </tr>

  </tbody>
</table>

### Funktionen

<table>
  <thead>
    <tr>
      <th>Vorgabe</th>
      <th>Umsetzung</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Login</td>
      <td>Spieler können mittels game-id und nickname in Spielen beitreten.</td>
    </tr>
    <tr>
      <td>Formulare</td>
      <td>Implementierung eines kompletten Chats sowie Startformularen.</td>
    </tr>
    <tr>
        <td>Validierung</td>
        <td>Jeder Spielzug wird vom Server validiert um cheating zu verhindern.</td>
    </tr>
<tr>
        <td>Sicherheit</td>
        <td>grundlegender Schutz gegen Webangriffe gegeben; starke Validierung.</td>
    </tr>
<tr>
        <td>Dynamik</td>
        <td>Der Einsatz von React macht die Webseite zu dynamisch und gleichzeitig SEO-freundlich.</td>
    </tr>
<tr>
        <td>Usecases berücksichtigt</td>
        <td>Das Spiel wurde ausgiebig und getestet und geprüft und hat in unseren Tests einwandfrei funktioniert.</td>
    </tr>
<tr>
        <td>Fehlermeldungen</td>
<td>Starke Validierung und Fehlermeldungen in Form einer [Snackbar] (https://material.io/components/snackbars), direkt-Feedback und Tooltips bei falschen Formulareingaben.</td>
</tr>
<tr>
        <td>Fehler vorhanden</td>
<td>Umfangreiche Testung auf unseren Test-Computern.</td>
</tr>
<tr>
        <td>KI</td>
<td>Verwendung von Künstlicher Intelligenz im Backend-System.</td>
</tr>
  </tbody>
</table>


### Design

<table>
  <thead>
    <tr>
      <th>Vorgabe</th>
      <th>Umsetzung</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Browserkompatibilität</td>
      <td>Umfangreiche Testung auf allen modernen Browsern (Edge, Firefox, Chrome, Safari).</td>
    </tr>
    <tr>
      <td>Seitenaufbau</td>
      <td>Optimierung auf responsive Design und verständlicher Seitenaufbau.</td>
    </tr>
    <tr>
        <td>Benutzbarkeit</td>
        <td>Wer die Regeln von Dame kennt, wird sich auf der Seite super zurechtfinden.</td>
    </tr>
<tr>
        <td>Hilfetexte</td>
        <td>Hilfetexte und Tooltips vorhanden.</td>
    </tr>
<tr>
        <td>W3C</td>
        <td>Positive Validierung unserer Testwebsite (https://cerulean-souffle-da2b8a.netlify.app/) mittels validator.w3.org und sehr guter Lighthouse-Score.</td>
    </tr>
  </tbody>
</table>

## Documentation

### Client

#### General

If you access the startpage you can create or join a game. You are also able to play vs an ai.
After you selected your choice (see next points). You get redirected to the main game page. On the righthandside you see
the Chat.
Above the chat can see and copy the LobbyID. There is also a "leave" button. This brings you back to the startpage.
On the lefthandside you can access the game. Above the game you can see the current state, like winner and the current
turn.

#### Play the Game

You play the game by simply clicking the checker you want to move. The game shows you how the figure can move.
Please be aware you are not allowed to move any checker if one can kill an enemy.

#### Game start

##### Creating a new Game

Give yourself a nickname. If you want to create a new lobby, click "create game" after filling in your nickname.
After you created the game you get redirected to the game page.

##### Join a game

If you want to join a game, please fill in your nickname and the lobbyID you want to join and click "join".

### Server

To use the server you need to establish a socket connection. Once established the server will respond to you with your
Socket-ID. This is important for late when you are ingame.

#### Querys

Each query you can send to the server with its requirements.

##### "joinGame"  requires JSON {nick, gameid}

Checks if the game of gameid exists or if the gameid is specified as "RANDOM". If so it either connects to a open random
game or if the game of gameid is not already full joins the game.

##### "createGame" requires JSON {nick, spectatable}

Creates a new game with a random gameid. Spectatable specifies if other people can watch the game, but is currently not
implemented.

##### "move" requires JSON {from, to}

If you are ingame it checks if its your turn and if your move is allowed. If so it updates the gamestate.

##### "message" requires JSON {msg}

If you are ingame it sends the message to all people in the current game.

##### "leaveGame" requires JSON {}

If you are ingame it disconnects you from the game and informs the other people that you left. Only you are able to
reconnect to the game. If there are no active players left in the game the game is deleted.

#### Responses

Each response the server sends depending on your previous action.

##### "error" sends JSON {code, msg, time}

If you send a illegal request you will be informed.

##### "gameState" sends JSON {board, turns, nextTurnPlayer, nextPossibleTurns, winner, time}

Each time the gameState changes it sends it to all connected players. `nextTurnPlayer` specifies whos turn it is, all
possible turns are listed in `nextPossibleTurns`. If no turns are possible the winner is selected. You know if its your
turn by looking at `nextTurnPlayer.id` it will match your Socket ID.

##### "playerJoin" sends JSON {game, player, time}

If you are another player joins your game you will be informed. `game` specifies the Game ID which can be used to
connect to the game. `player` specifies who joined.

##### "playerLeave" sends JSON {player, time}

Informs you that a player left your game.

##### "msg" sends JSON {msg, player, time}

Each time somebody in your game sends a message you will be informed.
