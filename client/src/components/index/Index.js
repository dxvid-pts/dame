import "./index.css";

export default function Index(props) {
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
            <button className="button"><span>Play vs Random</span></button>
        </div>
    );
}
