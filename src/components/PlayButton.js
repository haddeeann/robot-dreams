import React from 'react';
import './PlayButton.css';

function PlayButton({ onClick }) {
    return (
        <div>
            <button className="playButton" onClick={onClick}>Get Random Poetry</button>
        </div>
    );
}

export default PlayButton;