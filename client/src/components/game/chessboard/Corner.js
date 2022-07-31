import Images from "../../../shared/images";

//The corner of the chessboard
export function Corner(props) {
    return <div style={{
        gridArea: props.area,
        backgroundImage: "url(" + Images.BOARD_WHITE + ")",
        borderTopLeftRadius: props.area === "c1" ? "8px" : "0",
        borderTopRightRadius: props.area === "c2" ? "8px" : "0",
        borderBottomLeftRadius: props.area === "c3" ? "8px" : "0",
        borderBottomRightRadius: props.area === "c4" ? "8px" : "0",
    }}></div>
}