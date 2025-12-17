import React, { useState, useEffect } from 'react';

function GameScreen({ onEnd, isHost, timer, mode = 'ONLINE', duration = 10 }) {

    // Local State for Offline Mode
    const [localSeconds, setLocalSeconds] = useState(duration * 60);

    useEffect(() => {
        if (mode === 'LOCAL') {
            const interval = setInterval(() => {
                setLocalSeconds(s => {
                    if (s <= 0) {
                        clearInterval(interval);
                        // Optional: Auto-end? Or just wait for user
                        return 0;
                    }
                    return s - 1;
                });
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [mode, duration]);

    // Timer is now managed by App (Host updates DB, others read prop) for ONLINE
    // OR local state for LOCAL
    const seconds = mode === 'LOCAL' ? localSeconds : (timer || 0);

    const formatTime = (totalSeconds) => {
        const m = Math.floor(Math.max(0, totalSeconds) / 60);
        const s = Math.max(0, totalSeconds) % 60;
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
                color: '#94a3b8',
                marginBottom: '2rem',
                textTransform: 'uppercase',
                letterSpacing: '2px'
            }}>Find the Imposter!</p>

            {(isHost || mode === 'LOCAL') && (
                <button onClick={onEnd} className="btn danger-btn">
                    End Game
                </button>
            )}
        </div>
    );
}

export default GameScreen;
