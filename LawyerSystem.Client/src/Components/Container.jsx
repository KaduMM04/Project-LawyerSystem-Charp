import React from "react";

const Container = ({ children, newStyle = {} }) => {
    const baseStyle = {
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "0 1rem",
    };

    return (
        <div style={{ ...baseStyle, ...newStyle }}>
            {children}
        </div>
    );
};

export default Container;