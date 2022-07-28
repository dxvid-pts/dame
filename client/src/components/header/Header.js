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
    return (
        <div id="header" className="Header">
            <div className="HeaderElement">
                <div className="HeaderText">Checkers.Online: {props.game.player.nick}</div>
            </div>
            <div className="HeaderElement" id="lastHeaderElement">
                <div className="HeaderText">{props.game.id}</div>
                <button
                    className="Button HeaderButton"
                    onClick={() => copyToClipboard(props.game.id)}
                >
                    COPY
                </button>
            </div>
            <div className="HeaderElement">
                <button className="Button HeaderButton" onClick={props.game.leaveGame}>LEAVE</button>
            </div>
        </div>
    );
}
