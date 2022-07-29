export function PlayerTurnInfo(props) {

    let text;
    if (props.globalState.currentPlayerId == null || props.globalState.nextTurnPlayer == null) {
        text = "Waiting for enemy to join...";
    } else if (props.globalState.currentPlayerId === props.globalState.nextTurnPlayer) {
        text = "Your turn!";
    } else {
        text = "Not your turn!";
    }

    return <div id="player-turn-info"><p>{text}</p>
    </div>;
}