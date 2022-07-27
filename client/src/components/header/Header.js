import React from "react";

import "./Header.css";

const copyToClipboard = (str) => {
    if (navigator && navigator.clipboard && navigator.clipboard.writeText)
        return navigator.clipboard.writeText(str);
    return Promise.reject("The Clipboard API is not available.");
};

export default function Header(props) {
    return (
        <div id="header" className="Header">
            
            <div className="HeaderElement">
                <div className="HeaderText">{props.game.player.nick}</div>
            </div>
            <div className="HeaderElement" id="lastHeaderElement">
                <div className="HeaderText">{props.game.id}</div>
                <button
                    className="Button HeaderButton"
                    onClick={() => copyToClipboard(props.game.id)}
                >
                    copy
                </button>
            </div><div className="HeaderElement">
                <div className="HeaderText">|</div>
            </div>
            <div className="HeaderElement">
                <button className="Button HeaderButton" onClick={props.game.leaveGame}>leave</button>
            </div>
        </div>
    );
}
