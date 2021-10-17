import React from 'react';
import './Poem.css';

function Poem({ author, lines, title}) {
    let poemLines = [];
    for(let char = 0; char < lines.length; char++) {
        poemLines.push(<li key={char}>{lines[char]}</li>);
    }
    return (
        <div className='poem'>
            <h3>{title}</h3>
            <h4>{author}</h4>
            <ul>
                {poemLines}
            </ul>
        </div>
    );
}

export default Poem;
