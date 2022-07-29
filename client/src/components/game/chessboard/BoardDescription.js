import './ChessBoard.css';

const Images = require("shared/images");
const descriptionSize = 35;

export function BoardDescriptionSide(props) {
    const descriptions = ["A", "B", "C", "D", "E", "F", "G", "H"];

    return descriptions.map((e, index) => <div
        key={index}
        style={{
            gridArea: (props.rotate ? "dr" : "dl") + (index + 1).toString(),
            textAlign: "center",
            transform: "rotate(" + (props.rotate ? 180 : 0) + "deg)",
            backgroundImage: "url(" + Images.BOARD_WHITE + ")",
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
        }}><p>{e}</p>
    </div>);
}

export function BoardDescriptionBottomTop(props) {
    const descriptions = ["1", "2", "3", "4", "5", "6", "7", "8"];

    return descriptions.map((e, index) => <div
        key={index}
        style={{
            gridArea: (props.rotate ? "dt" : "db") + (index + 1).toString(),
            transform: "rotate(" + (props.rotate ? 180 : 0) + "deg)",
            backgroundImage: "url(" + Images.BOARD_WHITE + ")",
            textAlign: "center",
        }}><p style={{margin: descriptionSize / 4.5}}>{e}</p>
    </div>);
}