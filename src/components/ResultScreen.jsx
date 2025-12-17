import React from 'react';

function ResultScreen({ players, onPlayAgain, gameResult }) {
    // Find Imposter (Use persistent result if available, else derive)
    const imposterName = gameResult?.imposterName || players.find(p => p.role === 'IMPOSTER')?.name || "Unknown";

    // Find Secret Word
    const secretWord = gameResult?.secretWord || players.find(p => p.role === 'CIVILIAN')?.secret || "Unknown";

    return (
        <div className="glass-panel" style={{ textAlign: 'center', padding: '2rem' }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', color: '#fca5a5' }}>
                Time's Up!
            </h2>

            <div style={{ margin: '2rem 0', padding: '1.5rem', background: 'rgba(0,0,0,0.2)', borderRadius: '16px' }}>
                <p style={{ color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.9rem' }}>The Imposter Was</p>
                <h3 style={{ fontSize: '2rem', color: '#f43f5e', margin: '0.5rem 0' }}>
                    {imposterName}
                </h3>
            </div>

            <div style={{ margin: '2rem 0', padding: '1.5rem', background: 'rgba(0,0,0,0.2)', borderRadius: '16px' }}>
                <p style={{ color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.9rem' }}>The Secret Word Was</p>
                <h3 style={{ fontSize: '2rem', color: '#3b82f6', margin: '0.5rem 0' }}>
                    {secretWord}
                </h3>
            </div>

            <button onClick={onPlayAgain} className="btn primary-btn" style={{ width: '100%', padding: '16px', fontSize: '1.2rem', marginTop: '1rem' }}>
                Play Again
            </button>
        </div>
    );
}

export default ResultScreen;
