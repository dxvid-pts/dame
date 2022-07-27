import "./land.css";

export default function Index(props) {

    const socket = props.socket;

    function joinRandomGame(){
        socket.sendJoinGame("philipp","RANDOM");
        props.setIngame(true);
    }

    return (
        <div id="box">
            <div id="heading">
                <text id="text_black">Checkers</text>
                <text id="text_white">Online</text>
            </div>
            <div className="MenuEntry">

            </div>
            <button className="button"><span>Play vs Friend</span></button>
            <button className="button"><span>Play vs AI</span></button>
            <button className="button" onClick={joinRandomGame}><span>Play vs Random</span></button>
        </div>
    );
}
