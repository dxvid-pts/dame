import React from "react";
import "./ChatMessage.css"

const ChatMessage = ({ message }, nickname) => {
    console.log("joa los gehts");
    if(message.user.nickname === nickname) message.ownedByCurrentUser = "my-message";
    return (
        <div 
            className={`message-item ${
            message.ownedByCurrentUser ? "my-message" : "received-message"}
            `}
        >
            <div className="message-body-container">
                {!message.ownedByCurrentUser && (
                <div className="message-user-name">{message.user.nickname}</div>
                )}
                <div className="message-body">{message.body}</div>
            </div>
        </div>
    )
}
export default ChatMessage;