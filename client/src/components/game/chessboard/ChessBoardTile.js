import {useState} from "react";
import Constants from "shared/constants";
import {PlayerTile} from "./PlayerTile";

//a grid element of the chessboard containing the background and the tile
//this component also handles highlight rendering
export function ChessBoardTile(props) {
    //state used to render hover states
    const [isHovered, setIsHovered] = useState(false);

    //set grid colors (black and white)
    let white = props.row % 2 === 0;
    if (props.column % 2 === 0) {
        white = !white;
    }

    const opacity = 0.4;
    let tileColor;

    //mix image with semi transparent color if tile is hovered
    if (isHovered) {
        tileColor = "rgba(181,253,164," + opacity + ")";
    }

    //mix image with semi transparent color if tile is highlighted
    for (let position of props.globalState.highlightedFields) {
        if (position.row === props.row && position.column === props.column) {
            tileColor = tileColor = "rgba(255,0,0," + opacity + ")";
        }
    }

    //mix image with semi transparent color if tile is selected
    if (props.globalState.selectedTile != null && props.globalState.selectedTile.row === props.row && props.globalState.selectedTile.column === props.column) {
        tileColor = tileColor = "rgba(245,173,66," + opacity + ")";
    }

    //create the corresponding tile for the current grid element
    let p;
    switch (props.char) {
        case -1:
            p = <PlayerTile img={Constants.PLAYER_SVG_WHITE} visible={true}></PlayerTile>;
            break;
        case 1:
            p = <PlayerTile img={Constants.PLAYER_SVG_BLACK} visible={true}></PlayerTile>;
            break;
        default:
            p = <PlayerTile img={Constants.PLAYER_SVG_BLACK} visible={false}></PlayerTile>;
    }

    const backgroundImgUrl = white ? Constants.BOARD_WHITE : Constants.BOARD_BLACK;

    //prepare the grid area which is used for the layout
    const x = ["a", "b", "c", "d", "e", "f", "g", "h"];
    let gridArea = x[props.column] + "" + x[props.row];

    return <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => props.onClick({row: props.row, column: props.column})}
        style={{
            gridArea: gridArea,
            backgroundImage: "url(" + backgroundImgUrl + ")",
        }}>
        <div style={{
            backgroundColor: tileColor,
        }}>
            {p}
        </div>
    </div>;
}

//returns a row of eighth tiles. eighth row create a chessboard with 8x8 tiles
export function ChessRow(props) {
    const tiles = [];
    for (let i = 0; i < Constants.BOARD_SIZE; i++) {
        tiles.push(<ChessBoardTile
            char={props.chars[i]}
            column={props.column}
            row={i}
            onClick={props.onClick}
            globalState={props.globalState}
            key={props.column + "" + i}
        ></ChessBoardTile>);
    }

    return tiles;
}