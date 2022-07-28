import React from "react";
import "./ChatMessage.css";

export default function ChatMessage(props) {
    var date = new Date(props.msg.time);
    var time = date.getHours() + ":" + date.getMinutes();

    if (props.msg.sender === "sys") {
        return (
            <div
                className={`message-item sys-message
            `}
            >
                <div className="sys-body-container">
                    <div className="sys-body">{props.msg.content}</div>
                    <div>{time}</div>
                </div>
            </div>
        );
    } else return (
        <div
            className={`message-item sys-message
        `}
        >
            <div className="sys-body-container">
                <div className="sys-body">{props.msg.content}</div>
                <div>{time}</div>
                <div>{props.msg.sender.nick}</div>
            </div>
        </div>
    );;
}
