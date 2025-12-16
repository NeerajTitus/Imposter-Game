import React, { useState } from 'react';
import SetupScreen from './components/SetupScreen';
import RevealScreen from './components/RevealScreen';
import GameScreen from './components/GameScreen';
import ResultScreen from './components/ResultScreen';
import { wordList } from './data/wordList';

function App() {
    const [players, setPlayers] = useState([]);
    const [gamePhase, setGamePhase] = useState('SETUP'); // SETUP, REVEAL, PLAYING, GAME_OVER
    const [difficulty, setDifficulty] = useState('easy');
    const [currentTurn, setCurrentTurn] = useState(0);
    const [gameDuration, setGameDuration] = useState(10);

    const startGame = (playerNames, selectedDifficulty, selectedLanguage = 'english', timerValue = 10) => {
        setDifficulty(selectedDifficulty);
        setGameDuration(timerValue);

        // Select Word Pair
        // Ensure language exists, fallback to english if not
        const languageWords = wordList[selectedLanguage] || wordList['english'];
        const availableWords = languageWords[selectedDifficulty];

        // Safety check if words are missing
        if (!availableWords || availableWords.length === 0) {
            console.error(`No words found for ${selectedLanguage} - ${selectedDifficulty}`);
            return;
        }

        const randomPair = availableWords[Math.floor(Math.random() * availableWords.length)];

        // Assign Roles
        const imposterIndex = Math.floor(Math.random() * playerNames.length);

        const assignedPlayers = playerNames.map((name, i) => {
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

        setPlayers(assignedPlayers);
        setCurrentTurn(0);
        setGamePhase('REVEAL');
    };

    const nextTurn = () => {
        if (currentTurn < players.length - 1) {
            setCurrentTurn(currentTurn + 1);
        } else {
            setGamePhase('PLAYING');
        }
    };

    const handleGameOver = () => {
        setGamePhase('GAME_OVER');
    };

    const resetGame = () => {
        setGamePhase('SETUP');
        setCurrentTurn(0);
    };

    return (
        <div className="app-container">
            <div className="background-globes">
                <div className="globe globe-1"></div>
                <div className="globe globe-2"></div>
                <div className="globe globe-3"></div>
            </div>

            <header className="game-header">
                <h1>IMPOSTER</h1>
                <p className="subtitle">Trust No One.</p>
            </header>

            <main>
                {gamePhase === 'SETUP' && (
                    <SetupScreen onStart={startGame} />
                )}

                {gamePhase === 'REVEAL' && (
                    <RevealScreen
                        player={players[currentTurn]}
                        onNext={nextTurn}
                        isLast={currentTurn === players.length - 1}
                    />
                )}

                {gamePhase === 'PLAYING' && (
                    <GameScreen onEnd={handleGameOver} duration={gameDuration} />
                )}

                {gamePhase === 'GAME_OVER' && (
                    <ResultScreen players={players} onPlayAgain={resetGame} />
                )}
            </main>
        </div>
    );
}

export default App;
