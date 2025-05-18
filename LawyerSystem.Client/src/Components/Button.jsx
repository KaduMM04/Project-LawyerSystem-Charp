import React from 'react';

function Button({ type, text, onClick }) {
    return (
        <button
            type={type}
            onClick={onClick}
            className="PatternButton"
        >
            {text}
        </button>
    );
}

export default Button; 