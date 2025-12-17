import React, { useState, useEffect } from 'react';
import MainMenu from './components/MainMenu';
import SetupScreen from './components/SetupScreen'; // Restored for Local
import LandingScreen from './components/LandingScreen';
import LobbyScreen from './components/LobbyScreen';
import RevealScreen from './components/RevealScreen';
import GameScreen from './components/GameScreen';
import ResultScreen from './components/ResultScreen';
import { createRoom, joinRoom, subscribeToRoom, updateGameState } from './services/firebase';
import { wordList } from './data/wordList';

function App() {
    const [appMode, setAppMode] = useState('MENU'); // MENU, LOCAL, ONLINE

    // --- ONLINE STATE ---
    const [roomCode, setRoomCode] = useState(null);
    const [playerName, setPlayerName] = useState(null);
    const [roomData, setRoomData] = useState(null);

    // --- LOCAL STATE ---
    const [localPlayers, setLocalPlayers] = useState([]);
    const [localPhase, setLocalPhase] = useState('SETUP');
    const [localTurn, setLocalTurn] = useState(0);
    const [localDuration, setLocalDuration] = useState(10);


    // ================== ONLINE LOGIC ==================
    useEffect(() => {
        if (!roomCode || appMode !== 'ONLINE') return;

        const unsubscribe = subscribeToRoom(roomCode, (data) => {
            if (data) {
                setRoomData(data);
            } else {
                if (appMode === 'ONLINE') { // Only alert if still online
                    alert("Room closed!");
                    setRoomCode(null);
                    setRoomData(null);
                }
            }
        });

        return () => unsubscribe();
    }, [roomCode, appMode]);

    // Host Timer Helper (Online)
    useEffect(() => {
        if (appMode !== 'ONLINE' || !roomData || !roomData.players || !playerName) return;

        const me = roomData.players.find(p => p.name === playerName);
        if (me && me.isHost && roomData.gameState === 'PLAYING' && roomData.timer > 0) {
            const interval = setInterval(() => {
                updateGameState(roomCode, { timer: roomData.timer - 1 });
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [roomData, playerName, roomCode, appMode]);

    const handleCreateOnline = async (name, settings) => {
        try {
            const code = await createRoom(name, settings);
            setPlayerName(name);
            setRoomCode(code);
        } catch (e) {
            alert(e.message);
        }
    };

    const handleJoinOnline = async (code, name) => {
        try {
            await joinRoom(code, name);
            setPlayerName(name);
            setRoomCode(code);
        } catch (e) {
            alert(e.message);
        }
    };

    const handleStartOnlineGame = () => {
        if (!roomData) return;
        const players = roomData.players;
        const settings = roomData.settings;

        const { assignedPlayers } = generateRoles(players.map(p => p.name), settings.difficulty, settings.language);

        // Merge roles into existing player objects
        const updatedPlayers = {};
        players.forEach((p) => {
            const roleData = assignedPlayers.find(ap => ap.name === p.name);
            updatedPlayers[p.name] = { ...p, ...roleData };
        });

        updateGameState(roomCode, {
            players: updatedPlayers,
            gameState: 'REVEAL',
            timer: settings.duration * 60
        });
    };

    // ================== SHARED LOGIC ==================
    const generateRoles = (names, difficulty, language = 'english') => {
        const languageWords = wordList[language] || wordList['english'];
        const availableWords = languageWords[difficulty];
        const randomPair = availableWords[Math.floor(Math.random() * availableWords.length)];
        const imposterIndex = Math.floor(Math.random() * names.length);

        const assignedPlayers = names.map((name, i) => {
            const isImposter = i === imposterIndex;
            return {
                name,
                role: isImposter ? 'IMPOSTER' : 'CIVILIAN',
                secret: isImposter ? randomPair.clue : randomPair.word,
                instruction: isImposter
                    ? 'You are the Imposter! The clue is related to the secret word.'
                    : 'The Secret Word is:'
            };
        });
        return { assignedPlayers, randomPair };
    };


    // ================== LOCAL LOGIC ==================
    const startLocalGame = (names, difficulty, language, duration) => {
        const { assignedPlayers } = generateRoles(names, difficulty, language);
        setLocalPlayers(assignedPlayers);
        setLocalDuration(duration);
        setLocalTurn(0);
        setLocalPhase('REVEAL');
    };

    const handleLocalNextTurn = () => {
        if (localTurn < localPlayers.length - 1) {
            setLocalTurn(localTurn + 1);
        } else {
            setLocalPhase('PLAYING');
        }
    };

    // ================== NAVIGATION ==================
    const goHome = () => {
        setAppMode('MENU');
        setRoomCode(null);
        setRoomData(null);
        setLocalPhase('SETUP');
    };

    // Derived Render State
    const renderOnline = () => {
        if (!roomCode || !roomData) {
            return (
                <LandingScreen onCreate={handleCreateOnline} onJoin={handleJoinOnline} />
            );
        }

        const me = roomData.players.find(p => p.name === playerName) || {};
        const isHost = me.isHost;
        const phase = roomData.gameState;

        return (
            <>
                {phase === 'LOBBY' && (
                    <LobbyScreen
                        roomCode={roomCode}
                        players={roomData.players}
                        isHost={isHost}
                        onStart={handleStartOnlineGame}
                    />
                )}
                {phase === 'REVEAL' && (
                    <RevealScreen
                        player={me}
                        mode="ONLINE"
                        isHost={isHost}
                        onStartGame={() => updateGameState(roomCode, { gameState: 'PLAYING' })}
                    />
                )}
                {phase === 'PLAYING' && (
                    <GameScreen
                        mode="ONLINE"
                        timer={roomData.timer}
                        isHost={isHost}
                        onEnd={() => updateGameState(roomCode, { gameState: 'GAME_OVER' })}
                    />
                )}
                {phase === 'GAME_OVER' && (
                    <ResultScreen
                        players={roomData.players}
                        onPlayAgain={() => {
                            // Reset for online
                            const updatedPlayers = {};
                            roomData.players.forEach(p => {
                                updatedPlayers[p.name] = { ...p, role: null, secret: null };
                            });
                            updateGameState(roomCode, { gameState: 'LOBBY', players: updatedPlayers });
                        }}
                    />
                )}
            </>
        );
    };

    const renderLocal = () => {
        return (
            <>
                {localPhase === 'SETUP' && (
                    <SetupScreen onStart={startLocalGame} />
                )}
                {localPhase === 'REVEAL' && (
                    <RevealScreen
                        player={localPlayers[localTurn]}
                        mode="LOCAL"
                        onNext={handleLocalNextTurn}
                        isLast={localTurn === localPlayers.length - 1}
                    />
                )}
                {localPhase === 'PLAYING' && (
                    <GameScreen
                        mode="LOCAL"
                        duration={localDuration}
                        onEnd={() => setLocalPhase('GAME_OVER')}
                    />
                )}
                {localPhase === 'GAME_OVER' && (
                    <ResultScreen
                        players={localPlayers}
                        onPlayAgain={() => setLocalPhase('SETUP')}
                    />
                )}
            </>
        );
    };

    return (
        <div className="app-container">
            <div className="background-globes">
                <div className="globe globe-1"></div>
                <div className="globe globe-2"></div>
                <div className="globe globe-3"></div>
            </div>

            <header className="game-header">
                <h1 onClick={goHome} style={{ cursor: 'pointer' }}>IMPOSTER</h1>
                <p className="subtitle">Trust No One.</p>
                {appMode !== 'MENU' && (
                    <button
                        onClick={goHome}
                        style={{ background: 'none', border: 'none', color: '#fff', opacity: 0.5, cursor: 'pointer', marginTop: '20px' }}
                    >
                        Exit to Menu
                    </button>
                )}
            </header>

            <main>
                {appMode === 'MENU' && <MainMenu onSelectMode={setAppMode} />}
                {appMode === 'ONLINE' && renderOnline()}
                {appMode === 'LOCAL' && renderLocal()}
            </main>
        </div>
    );
}

export default App;
