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


### Installing the client

1. Navigate into the `client` folder
2. Run `npm install` to install all the needed components
3. Run `npm run build` to generate a production build.
4. Once the client is compiled inside the `build` folder, run `serve -s build` to host the client locally. If `serve` is not installed on your system install it via `npm install -g serve`.
5. Open [http://localhost:3000](http://localhost:3000) in your browser.

We also provide a hosted site: [https://cerulean-souffle-da2b8a.netlify.app/](https://cerulean-souffle-da2b8a.netlify.app/).
Note that you still need to run the server locally otherwise the website will not work. Every server call is routed to localhost.

### Installing the server
1. Navigate into the `client` folder
2. Run `npm install` to install all the needed components
3. Run `NODE_ENV=production node src/start.js` to start the server in production mode. Make sure to have Node installed on you system.

