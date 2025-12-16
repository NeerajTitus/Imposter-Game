import React, { useState, useEffect } from 'react';

function GameScreen({ onEnd, duration = 10 }) {
    const [seconds, setSeconds] = useState(duration * 60);

    useEffect(() => {
        const timer = setInterval(() => {
            setSeconds(s => {
                if (s <= 0) {
                    clearInterval(timer);
                    return 0;
                }
                return s - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const formatTime = (totalSeconds) => {
        const m = Math.floor(totalSeconds / 60);
        const s = totalSeconds % 60;
        return `${m}:${s < 10 ? '0' : ''}${s}`;
    };

    return (
        <div className="glass-panel" style={{ textAlign: 'center', padding: '3rem 1.5rem' }}>
            <h2>Time Remaining</h2>
            <div style={{
                fontSize: '5rem',
                fontWeight: 800,
                margin: '1.5rem 0',
                color: '#f8fafc',
                textShadow: '0 0 30px rgba(59, 130, 246, 0.5)',
                fontVariantNumeric: 'tabular-nums'
            }}>
                {formatTime(seconds)}
            </div>
            <p style={{
                fontSize: '1.2rem',
                color: '#94a3b8',
                textTransform: 'uppercase',
                letterSpacing: '2px'
            }}>Find the Imposter!</p>

            <button onClick={onEnd} className="btn danger-btn">
                End Game
            </button>
        </div>
    );
}

export default GameScreen;
