import React from "react";

import "./Header.css";

//copy the current game id to the clipboard when available
const copyToClipboard = (str) => {
    if (navigator && navigator.clipboard && navigator.clipboard.writeText)
        return navigator.clipboard.writeText(str);
    return Promise.reject("The Clipboard API is not available.");
};

//Header component
export default function Header(props) {
    function getNextTurnString() {
        if(props.game.nextTurn === null){
            return "Waiting for Enemy...";
        } else {
            if(props.game.winner !== null) {
                console.log(props.game.winner);
                alert("Game end!");
                return props.game.winner.nick + " has won the game! You can leave now!";
            }
            if(props.game.nextTurn === props.game.player.id){
                return "Your Turn";
            }else{
                return "Enemy's Turn";
            }
        }
    }
    return (
        <div id="header" className="Header">
            <div className="HeaderElement">
                <div className="HeaderText">{props.game.player.nick}</div>
            </div>
            <div className="HeaderElement">
                <div className="HeaderText" id="headerCenterText">{getNextTurnString()}</div>
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
        </div>
    );
}
