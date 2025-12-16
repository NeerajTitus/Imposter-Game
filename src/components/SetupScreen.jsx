import React, { useState } from 'react';

function SetupScreen({ onStart }) {
    const [names, setNames] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [difficulty, setDifficulty] = useState('easy');
    const [language, setLanguage] = useState('english');
    const [timerInput, setTimerInput] = useState(10);

    const [showInstructions, setShowInstructions] = useState(false);

    const addPlayer = () => {
        const trimmed = inputValue.trim();
        if (!trimmed) return;
        if (names.some(n => n.toLowerCase() === trimmed.toLowerCase())) {
            alert("Player already exists!");
            return;
        }
        setNames([...names, trimmed]);
        setInputValue('');
    };

    const removePlayer = (index) => {
        setNames(names.filter((_, i) => i !== index));
    };

    const handleStart = () => {
        if (names.length >= 4) {
            onStart(names, difficulty, language, parseInt(timerInput) || 10);
        }
    };

    return (
        <div className="glass-panel">
            <h2>Game Setup</h2>

            {/* Language Selector */}
            <div className="language-selector" style={{ margin: '1rem 0', textAlign: 'center' }}>

                {['english', 'malayalam'].map((lang) => (
                    <button
                        key={lang}
                        onClick={() => setLanguage(lang)}
                        className={`btn ${language === lang ? 'primary-btn' : 'secondary-btn'}`}
                        style={{
                            fontSize: '0.9rem',
                            padding: '8px 16px',
                            opacity: language === lang ? 1 : 0.6,
                            marginTop: 0,
                            textTransform: 'capitalize',

                        }}
                    >
                        {lang === 'english' ? 'English' : 'മലയാളം'}
                    </button>
                ))}

            </div>

            {/* Difficulty Selector */}
            <div className="difficulty-selector" style={{ margin: '1.5rem 0' }}>
                <p className="hint-text">Select Difficulty</p>
                <div className='difficulty-container'>
                    {['easy', 'medium', 'hard'].map((level) => (
                        <button
                            key={level}
                            onClick={() => setDifficulty(level)}
                            className={`btn ${difficulty === level ? 'primary-btn' : 'secondary-btn'}`}
                            style={{
                                fontSize: '0.9rem',
                                padding: '8px',
                                opacity: difficulty === level ? 1 : 0.6,
                                marginTop: '15px',
                                textTransform: 'capitalize'
                            }}
                        >
                            {level}
                        </button>
                    ))}
                </div>
            </div>

            {/* Timer Input */}
            <div className="timer-input" style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
                <p className="hint-text">Set Your Timer (Minutes)</p>
                <input
                    type="number"
                    min="1"
                    max="60"
                    value={timerInput}
                    onChange={(e) => setTimerInput(e.target.value)}
                    style={{
                        background: 'rgba(0, 0, 0, 0.2)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        padding: '8px',
                        borderRadius: '8px',
                        color: 'white',
                        textAlign: 'center',
                        width: '80px',
                        fontSize: '1.2rem',
                        marginTop: '0.5rem'
                    }}
                />
            </div>

            {/* Player Input */}
            <div className="input-group" style={{ display: 'flex', gap: '10px', marginBottom: '1rem' }}>
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && addPlayer()}
                    placeholder="Enter player name..."
                    style={{
                        flex: 1,
                        background: 'rgba(0, 0, 0, 0.2)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        padding: '12px 16px',
                        borderRadius: '12px',
                        color: 'white',
                        outline: 'none'
                    }}
                />
                <button onClick={addPlayer} className="btn primary-btn">+</button>
            </div>

            {/* List */}
            <div className="player-list-container" style={{ maxHeight: '200px', overflowY: 'auto', marginBottom: '1rem' }}>
                {names.map((name, index) => (
                    <div key={index} style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        background: 'rgba(255,255,255, 0.03)',
                        padding: '10px 14px',
                        borderRadius: '8px',
                        marginBottom: '8px'
                    }}>
                        <span>{name}</span>
                        <button
                            onClick={() => removePlayer(index)}
                            style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '1.2rem' }}
                        >
                            &times;
                        </button>
                    </div>
                ))}
            </div>

            <div className="action-area" style={{ textAlign: 'center' }}>
                <p className="hint-text" style={{ color: names.length >= 4 ? '#4ade80' : '#94a3b8' }}>
                    {names.length >= 4 ? `${names.length} Players Ready` : `Minimum 4 players required`}
                </p>
                <button
                    onClick={handleStart}
                    disabled={names.length < 4}
                    className="btn action-btn"
                >
                    Start Game
                </button>

                <button
                    onClick={() => setShowInstructions(true)}
                    style={{ background: 'transparent', border: 'none', color: '#94a3b8', marginTop: '1rem', textDecoration: 'underline', cursor: 'pointer' }}
                >
                    How to Play?
                </button>
            </div>

            {/* Instructions Modal */}
            {showInstructions && (
                <div className="modal-overlay" onClick={() => setShowInstructions(false)}>
                    <div className="glass-panel modal-content" onClick={e => e.stopPropagation()}>
                        <button className="close-modal-btn" onClick={() => setShowInstructions(false)}>&times;</button>
                        <h2 style={{ marginBottom: '1rem', color: '#f43f5e' }}>How to Play</h2>
                        <ul className="instruction-list">
                            <li><strong>Objective:</strong> Civilians must find the Imposter. The Imposter must blend in.</li>
                            <li><strong>Setup:</strong> Enter names and pass the device around.</li>
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
                </div>
            )}
        </div>
    );
}

export default SetupScreen;
