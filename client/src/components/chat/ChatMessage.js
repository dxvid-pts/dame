import React from "react";
import "./ChatMessage.css";

//component to render a chat message
export default function ChatMessage(props) {
    const date = new Date(props.msg.time);
    const time = date.getHours() + ":" + date.getMinutes();

    //extract class of sender
    function getMessageClass() {
        if (props.msg.sender === "sys") {
            return "sys";
        }
        if (props.msg.sender.id === props.playerid) {
            return "player";
        } else {
            return "enemy";
        }
    }

    //extract name of sender
    function getName() {
        return getMessageClass() !== "sys" ? (
                <div className="MessageInfo">{props.msg.sender.nick + ", " + time}</div>) :
            <div className="MessageInfo">{time}</div>;
    }

    return (<li className="Message">
            <div className={"Message-" + getMessageClass()}>
                <div className={"Body-" + getMessageClass()}>
                    <div className="">{props.msg.content}</div>
                </div>
                {getName()}
            </div>

        </li>);
}
