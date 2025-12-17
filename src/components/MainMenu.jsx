import React, { useState } from 'react';

function MainMenu({ onSelectMode }) {
    const [showInstructions, setShowInstructions] = useState(false);
    return (
        <div className="glass-panel" style={{ textAlign: 'center', padding: '3rem 1.5rem' }}>
            <h1 style={{ marginBottom: '1rem', fontSize: '2.5rem' }}>IMPOSTER</h1>
            <p style={{ color: '#94a3b8', marginBottom: '3rem' }}>Select Game Mode</p>

            <div style={{ display: 'grid', gap: '20px' }}>
                <button
                    onClick={() => onSelectMode('LOCAL')}
                    className="btn primary-btn"
                    style={{ padding: '20px', fontSize: '1.2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px' }}
                >
                    <span>📱 Pass & Play</span>
                    <span style={{ fontSize: '0.8rem', opacity: 0.8, fontWeight: 400 }}>Offline • Single Device</span>
                </button>

                <button
                    onClick={() => onSelectMode('ONLINE')}
                    className="btn secondary-btn"
                    style={{ padding: '20px', fontSize: '1.2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px' }}
                >
                    <span>🌍 Play Online</span>
                    <span style={{ fontSize: '0.8rem', opacity: 0.8, fontWeight: 400 }}>Multiplayer • Multiple Devices</span>
                </button>
            </div>

            <button
                onClick={() => setShowInstructions(true)}
                style={{ background: 'transparent', border: 'none', color: '#94a3b8', marginTop: '2rem', textDecoration: 'underline', cursor: 'pointer' }}
            >
                How to Play?
            </button>

            {/* Instructions Modal */}
            {
                showInstructions && (
                    <div className="modal-overlay" onClick={() => setShowInstructions(false)}>
                        <div className="glass-panel modal-content" onClick={e => e.stopPropagation()}>
                            <button className="close-modal-btn" onClick={() => setShowInstructions(false)}>&times;</button>
                            <h2 style={{ marginBottom: '1rem', color: '#f43f5e' }}>How to Play</h2>
                            <ul className="instruction-list" style={{ textAlign: 'left' }}>
                                <li><strong>Objective:</strong> Civilians must find the Imposter. The Imposter must blend in.</li>
                                <li><strong>Setup:</strong> Enter names and pass the device around (Local) or Join a Room (Online).</li>
                                <li><strong>Roles:</strong>
                                    <br />🕵️ <strong>Imposter:</strong> You get a Clue word. Try to guess the Secret Word or avoid suspicion.
                                    <br />👤 <strong>Civilian:</strong> You get the Secret Word and find the real Imposter among you.
                                </li>
                                <li><strong>Gameplay:</strong>
                                    <br />1. Everyone sees their role.
                                    <br />2. Start the Timer (10 mins).
                                    <br />3. Discuss and ask questions related to the word.
                                    <br />4. Vote out the Imposter before time is up!
                                </li>
                            </ul>
                            <button className="btn primary-btn" style={{ width: '100%' }} onClick={() => setShowInstructions(false)}>Got it!</button>
                        </div>
                    </div >
                )
            }
        </div >

    );
}

export default MainMenu;
