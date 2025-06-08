import React from 'react';
import "../Style/Button.css";

function Button({ type, text, onClick, className, style, path }) {

    
    if (style == "img") {
        return (
            <button
                type={type}
                onClick={onClick}
                className={className}
            >
                <img src={path} ></img>

            </button>
        );
    }


    return (
        <button
            type={type}
            onClick={onClick}
            className={className}
        >
            {text}
            
        </button>
    );
}

export default Button; 