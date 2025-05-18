import React from 'react';
import "../Style/Button.css";

function Button({ type, text, onClick, Class, style, path }) {

    
    if (style == "img") {
        return (
            <button
                type={type}
                onClick={onClick}
                className={Class}
            >
                <img src={path} ></img>

            </button>
        );
    }


    return (
        <button
            type={type}
            onClick={onClick}
            className={Class}
        >
            {text}
            
        </button>
    );
}

export default Button; 