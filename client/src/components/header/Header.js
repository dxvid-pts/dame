import React from "react";

import "./Header.css";

//copy the current game id to the clipboard when available
const copyToClipboard = (str) => {
    if (navigator && navigator.clipboard && navigator.clipboard.writeText) return navigator.clipboard.writeText(str);
    return Promise.reject("The Clipboard API is not available.");
};

//Header component
export default function Header(props) {
    function getNextTurnString() {
        if(props.game.player == null){
return;
}
        if (props.game.winner !== null) {
            if (props.game.winner.id === props.game.player.id) {
                return "YOU WON";
            } else {
                return "YOU LOST";
            }
        }
        if (props.game.nextTurn === null) {
            return "WAITING FOR ENEMY...";
        } else {
            if (props.game.nextTurn === props.game.player.id) {
                return "YOUR TURN";
            } else {
                return "ENEMY'S TURN";
            }
        }
    }

    return (<div id="header" className="Header">
            <div className="HeaderElement">
                <div className="HeaderText">{props.game.player != null ? props.game.player.nick : null}</div>
            </div>
            <div className="HeaderElement">
                <div className="HeaderText" id="headerCenterText">
                    {getNextTurnString()}
                </div>
            </div>
            <div className="HeaderElement">
                <div className="HeaderText">{props.game.id}</div>
                <button
                    className="Button HeaderButton"
                    onClick={() => copyToClipboard(props.game.id)}
                >
                    COPY
                </button>

                <button
                    className="Button HeaderButton"
                    onClick={props.game.leaveGame}
                >
                    LEAVE
                </button>
            </div>
        </div>);
}
