export function PlayerTurnInfo(props) {
    if (props.globalState.currentPlayerId == null || props.globalState.nextTurnPlayer == null) {
        return <div></div>;
    }
    let text = props.globalState.currentPlayerId === props.globalState.nextTurnPlayer ? "Your turn!" : "Not your turn!";
    return <div id="player-turn-info"><p>{text}</p>
    </div>;
}