import React from 'react';
import "./Char.css";

const Char = ({test}) => {
    if(test === "none")
    {
        return;
    }
    else {
        return (
            <div className='test'>
                    <span className={`${test==="white" ? "white" : "black"}`}
                    ></span>
            </div>
    )
    }
}

export default Char;