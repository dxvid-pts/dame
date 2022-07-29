# CHECKERS.ONLINE

An online game to play dame with your friends and other players. If you want to go the extra mile, try to beat the AI!

## Installation

The project is organized in three parts.
- client
- shared
- server

To run the project locally you need to compile the client and the server.

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

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
