
import React from 'react';
import './ActionBar.css';
import { useState, useRef } from 'react';


function ActionBar() {
    const [isRunning, setIsRunning] = useState(false);
    const [status, setStatus] = useState('Ready');

    const handlePlay = () => {
        setIsRunning(true);
        setStatus('Running');
    };

    const handlePause = () => {
        setIsRunning(false);
        setStatus('Paused');
    };

    const handleReset = () => {
        setIsRunning(false);
        setStatus('Reset');
    };

    return (
        <div className='container'>
            <div className="action-bar" role="toolbar" aria-label="Player controls">

                <div className="player-controls">
                    <button className="btn btn-reset" title="Reset" aria-label="Reset" onClick={handleReset}>⟲</button>
                    <button className={`btn btn-play ${isRunning ? 'hidden' : ''}`} title="Play" aria-label="Play" onClick={handlePlay}>▶</button>
                    <button className={`btn btn-pause ${isRunning ? '' : 'hidden'}`} title="Pause" aria-label="Pause" onClick={handlePause}>⏸</button>
                </div>

                <div className="player-right">
                    <div className="status" aria-live="polite">{status}</div>
                </div>
            </div>
        </div>
    );
}

export default ActionBar;