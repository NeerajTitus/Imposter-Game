import React, { useState, useEffect } from 'react';

function RevealScreen({ player, onNext, isLast }) {
    const [isFlipped, setIsFlipped] = useState(false);

    // Reset flip when player changes
    useEffect(() => {
        setIsFlipped(false);
    }, [player]);

    const handleNext = () => {
        if (isFlipped) setIsFlipped(false); // Flip back before transition
        setTimeout(() => {
            onNext();
        }, 300);
    };

    return (
        <div className="view active">
            <div className="instruction-text" style={{ textAlign: 'center', marginBottom: '1rem' }}>
                <h2>Pass to {player.name}</h2>
                <p style={{ color: '#94a3b8' }}>Tap the card to reveal your secret identity</p>
            </div>

            <div
                className="card-container"
                onClick={() => setIsFlipped(!isFlipped)}
                style={{
                    perspective: '1000px',
                    width: '280px',
                    height: '400px',
                    margin: '2rem 0',
                    cursor: 'pointer',
                    margin: '0 auto',
                }}
            >
                <div
                    className={`game-card ${isFlipped ? 'flipped' : ''}`}
                    style={{
                        width: '100%',
                        height: '100%',
                        position: 'relative',
                        transformStyle: 'preserve-3d',
                        transition: 'transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                        transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
                    }}
                >
                    {/* Front */}
                    <div className="card-face card-front" style={{
                        position: 'absolute', width: '100%', height: '100%', backfaceVisibility: 'hidden',
                        borderRadius: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
                        background: 'linear-gradient(135deg, #1e293b, #0f172a)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        boxShadow: '0 10px 40px rgba(0,0,0,0.5)'
                    }}>
                        <div style={{ fontSize: '4rem', color: '#94a3b8', opacity: 0.3, marginBottom: '1rem' }}>?</div>
                        <p>TAP TO FLIP</p>
                    </div>

                    {/* Back */}
                    <div className="card-face card-back" style={{
                        position: 'absolute', width: '100%', height: '100%', backfaceVisibility: 'hidden',
                        borderRadius: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
                        background: player.role === 'IMPOSTER' ? 'linear-gradient(135deg, #ef4444, #991b1b)' : 'linear-gradient(135deg, #3b82f6, #1e40af)', // Dynamic Color
                        transform: 'rotateY(180deg)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        boxShadow: '0 10px 40px rgba(0,0,0,0.5)',
                        padding: '2rem', textAlign: 'center'
                    }}>
                        <h3>{player.role}</h3>
                        <p style={{ opacity: 0.9, lineHeight: 1.5 }}>{player.instruction}</p>
                        <div style={{ fontSize: '1.5rem', fontWeight: 800, margin: '1rem 0', textShadow: '0 2px 10px rgba(0,0,0,0.3)' }}>
                            {player.secret}
                        </div>

                    </div>
                </div>
            </div>

            <button onClick={handleNext} className="btn action-btn secondary">
                {isLast ? "Start Game" : "Next Player"}
            </button>
        </div>
    );
}

export default RevealScreen;
