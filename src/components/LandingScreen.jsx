import React, { useState } from 'react';

function LandingScreen({ onCreate, onJoin, initialCode }) {
    const [joinCode, setJoinCode] = useState(initialCode || '');
    const [name, setName] = useState('');
    const [mode, setMode] = useState(initialCode ? 'join' : 'menu'); // Auto-switch if code present
    const [settings, setSettings] = useState({ difficulty: 'easy', language: 'english', duration: 10 });

    React.useEffect(() => {
        if (initialCode) {
            setJoinCode(initialCode);
            setMode('join');
        }
    }, [initialCode]);

    const handleCreate = () => {
        if (!name.trim()) return alert("Enter your name!");
        onCreate(name, settings);
    };

    const handleJoin = () => {
        if (!name.trim()) return alert("Enter your name!");
        if (joinCode.length !== 4) return alert("Enter 4-letter room code!");
        onJoin(joinCode.toUpperCase(), name);
    };

    if (mode === 'menu') {
        return (
            <div className="glass-panel" style={{ textAlign: 'center', padding: '3rem 1.5rem' }}>
                <h1 style={{ marginBottom: '2rem' }}>Imposter</h1>

                <input
                    className="styled-input"
                    placeholder="Enter Your Name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    style={{
                        margin: '1rem 0',
                        width: '100%',
                        padding: '12px',
                        fontSize: '1.2rem',
                        textAlign: 'center'
                    }}
                />

                <div style={{ display: 'grid', gap: '15px' }}>
                    <button onClick={() => setMode('create')} className="btn primary-btn">
                        Create Room
                    </button>
                    <button onClick={() => setMode('join')} className="btn secondary-btn" style={{ marginTop: `0` }}>
                        Join Room
                    </button>
                </div>
            </div>
        );
    }

    if (mode === 'join') {
        return (
            <div className="glass-panel" style={{ textAlign: 'center', padding: '3rem 1.5rem' }}>
                <h2>Join Room</h2>

                <div style={{ textAlign: 'left', marginBottom: '0.5rem' }}>
                    <label style={{ color: '#94a3b8', fontSize: '0.9rem', marginLeft: '4px' }}>Your Name</label>
                </div>
                <input
                    className="styled-input"
                    placeholder="e.g. Player 1"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    style={{
                        marginBottom: '1.5rem',
                        width: '100%',
                        padding: '12px',
                        fontSize: '1.2rem',
                        textAlign: 'center'
                    }}
                />

                <div style={{ textAlign: 'left', marginBottom: '0.5rem' }}>
                    <label style={{ color: '#94a3b8', fontSize: '0.9rem', marginLeft: '4px' }}>Room Code</label>
                </div>
                <input
                    className="styled-input"
                    placeholder="ABCD"
                    value={joinCode}
                    onChange={e => setJoinCode(e.target.value.toUpperCase())}
                    maxLength={4}
                    style={{
                        marginBottom: '1.5rem',
                        width: '100%',
                        padding: '12px',
                        fontSize: '2rem',
                        textAlign: 'center',
                        textTransform: 'uppercase',
                        letterSpacing: '5px',
                        fontFamily: 'monospace'
                    }}
                />
                <button onClick={handleJoin} className="btn primary-btn" style={{ width: '100%' }}>
                    Enter Room
                </button>
                <button onClick={() => setMode('menu')} className="btn text-btn primary-btn" style={{ marginTop: '1rem' }}>
                    Back
                </button>
            </div>
        );
    }

    if (mode === 'create') {
        return (
            <div className="glass-panel" style={{ textAlign: 'center' }}>
                <h2>Room Settings</h2>
                {/* Re-use your existing Setup Logic UI here roughly */}

                <div style={{ margin: '1rem 0' }}>
                    <label style={{ display: 'block', marginBottom: '15px' }}>Difficulty</label>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '5px', justifyContent: 'center' }}>
                        {['easy', 'medium', 'hard'].map(d => (
                            <button
                                key={d}
                                onClick={() => setSettings({ ...settings, difficulty: d })}
                                className={`btn ${settings.difficulty === d ? 'primary-btn' : 'secondary-btn'}`}
                                style={{ padding: '8px', textTransform: 'capitalize', opacity: settings.difficulty === d ? 1 : 0.8 }}
                            >
                                {d}
                            </button>
                        ))}
                    </div>
                </div>

                <div style={{ margin: '1rem 0' }}>
                    <label style={{ display: 'block', margin: '15px 0' }}>Language</label>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '5px', justifyContent: 'center' }}>
                        {['English', 'Malayalam'].map(l => (
                            <button
                                key={l}
                                onClick={() => setSettings({ ...settings, language: l.toLowerCase() })}
                                className={`btn ${settings.language === l.toLowerCase() ? 'primary-btn' : 'secondary-btn'}`}
                                style={{ textTransform: 'capitalize', opacity: settings.language === l.toLowerCase() ? 1 : 0.8 }}
                            >
                                {l}
                            </button>
                        ))}
                    </div>
                </div>

                <div style={{ margin: '2rem 0' }}>
                    <label>Timer (Mins): {settings.duration}</label>
                    <input
                        type="range"
                        min="1" max="20"
                        value={settings.duration}
                        onChange={(e) => setSettings({ ...settings, duration: parseInt(e.target.value) })}
                        style={{ width: '100%', accentColor: '#f43f5e' }}
                    />
                </div>

                <button onClick={handleCreate} className="btn primary-btn" style={{ width: '100%' }}>
                    Start Lobby
                </button>
                <button onClick={() => setMode('menu')} className="btn text-btn primary-btn" style={{ marginTop: '1rem' }}>
                    Back
                </button>
            </div>
        );
    }
}

export default LandingScreen;
