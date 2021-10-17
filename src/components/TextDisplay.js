import React from 'react';
import './TextDisplay.css';

function TextDisplay({ error, searchError, children }) {
    if(error) {
        return (
            <div>
                {error}
            </div>
        );
    } else {
        return (
            <div>
                {searchError}
                {children}
            </div>
        );
    }
}

export default TextDisplay;