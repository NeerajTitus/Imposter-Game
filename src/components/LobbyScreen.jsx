import React from 'react';

function LobbyScreen({ roomCode, players, isHost, onStart }) {

    const handleStart = () => {
        if (players.length < 3) { // Reduced to 3 for testing? Or keep min 4
            alert("Need at least 3 players!"); // Let's allow 3 for easier testing
            return;
        }
        onStart();
    };

    return (
        <div className="glass-panel" style={{ textAlign: 'center', width: '100%' }}>
            <p style={{ color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px' }}>Room Code</p>
            <h1 style={{
                fontSize: '3.5rem',
                margin: '0.5rem 0',
                color: '#fff',
                letterSpacing: '10px',
                fontFamily: 'monospace'
            }}>
                {roomCode}
            </h1>

            <button
                onClick={() => {
                    const url = `${window.location.origin}${window.location.pathname}?room=${roomCode}`;
                    navigator.clipboard.writeText(url);
                    alert("Invite link copied to clipboard: " + url);
                }}
                className="btn secondary-btn"
                style={{ fontSize: '0.9rem', marginBottom: '1rem', padding: '5px 10px', opacity: 0.8 }}
            >
                🔗 Copy Invite Link
            </button>

            <div style={{ margin: '2rem 0', textAlign: 'left' }}>
                <h3 style={{ marginBottom: '1rem' }}>Players ({players.length})</h3>
                <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                    {players.map((p, i) => (
                        <div key={i} style={{
                            background: 'rgba(255,255,255,0.05)',
                            padding: '12px',
                            marginBottom: '8px',
                            borderRadius: '8px',
                            display: 'flex',
                            justifyContent: 'space-between'
                        }}>
                            <span>{p.name}</span>
                            {p.isHost && <span style={{ color: '#fca5a5', fontSize: '0.8rem' }}>HOST</span>}
                        </div>
                    ))}
                </div>
            </div>

            {isHost ? (
                <button onClick={handleStart} className="btn primary-btn" style={{ width: '100%', fontSize: '1.2rem' }}>
                    Start Game
                </button>
            ) : (
                <div style={{ padding: '1rem', background: 'rgba(0,0,0,0.2)', borderRadius: '8px' }}>
                    Running on Host's command...
                </div>
            )}
        </div>
    );
}

export default LobbyScreen;
