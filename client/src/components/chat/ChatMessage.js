import React from "react";
import "./ChatMessage.css"


const ChatMessage = ({ message }) => {
    console.log("Rendering Message: ");
    console.log(message);
    let user = message.me
    if(message.player.nick.toLowerCase() === "system" && message.player.socketid === "0")  message.ownedByCurrentUser = "sys-message";
    else if(message.player.nick === user.nick && message.player.socketid === user.socketid ) message.ownedByCurrentUser = "my-message";
    else message.ownedByCurrentUser = "received-message"
    return (
        <div 
            className={`message-item ${message.ownedByCurrentUser}
            `}
        >
            <div className="message-body-container">
                {!message.ownedByCurrentUser && (
                <div className="message-user-name">{message.player.nick}</div>
                )}
                <div className="message-body">{message.msg}</div>
            </div>
        </div>
    )
}
export default ChatMessage;