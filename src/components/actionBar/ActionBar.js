
import React from 'react';
import './ActionBar.css';

function ActionBar() {
    return (
        <div className='container'>
            <div className="action-bar" role="toolbar" aria-label="Player controls">

                <div className="player-controls">
                    <button className="btn btn-reset" title="Reset" aria-label="Reset">⟲</button>
                    <button className="btn btn-play" title="Play" aria-label="Play">▶</button>
                    <button className="btn btn-pause" title="Pause" aria-label="Pause">⏸</button>
                </div>

                <div className="player-right">
                    <div className="status" aria-live="polite">Ready</div>
                </div>
            </div>
        </div>
    );
}

export default ActionBar;