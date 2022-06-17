import React from 'react';
import "./Char.css";

const Char = ({test}) => {
    console.log(test.player);
    if(test.player == "none")
    {
        return;
    }
    else {
        return (
            <div className='test'>
                    <span className={`${test.player ? "white" : "red"}`}
                    ></span>
            </div>
    )
    }
}

export default Char;