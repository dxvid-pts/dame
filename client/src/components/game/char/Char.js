import React from 'react';
import "./Char.css";

const Char = ({test}) => {
    debugger;
    let charset = "error";
    console.log("UI" + test);
    switch (test) {
        case -1:
            charset = "white";
            break;
        case 1:
            charset = "black";
            break;
        case 2:
            charset = "dame-black";
            break;
        case -2:
            charset = "dame-white";
            break;
        default:
            return(<div></div>);
    
    }
    console.log(charset);
        return (
            <div className='test'>
                    <span className={charset}
                    ></span>
            </div>
    )
    
}

export default Char;