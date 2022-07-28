//Component used to render a tile in the grid (e.g white figure, black figure)
export function PlayerTile(props) {
    return <img alt={"self-Logo"} src={props.img.default} style={{
        width: "100%",
        height: "100%",
        "pointer-events": "none",
        "user-select": "none",
        visibility: props.visible ? "visible" : "hidden",
    }}></img>;
}