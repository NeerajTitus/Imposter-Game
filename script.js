document.addEventListener('DOMContentLoaded', () => {
    // --- Data ---
    const wordList = [
        // Food & Drink
        { word: "Kulfi", clue: "Frozen" },
        { word: "Pizza", clue: "Cheese" },
        { word: "Sushi", clue: "Raw" },
        { word: "Burger", clue: "Bun" },
        { word: "Coffee", clue: "Caffeine" },
        { word: "Chocolate", clue: "Sweet" },
        { word: "Popcorn", clue: "Cinema" },
        { word: "Spaghetti", clue: "Noodles" },
        { word: "Taco", clue: "Shell" },
        { word: "Pancake", clue: "Syrup" },

        // Places
        { word: "Beach", clue: "Sand" },
        { word: "Library", clue: "Books" },
        { word: "Hospital", clue: "Doctors" },
        { word: "School", clue: "Teacher" },
        { word: "Airport", clue: "Planes" },
        { word: "Gym", clue: "Workout" },
        { word: "Space Station", clue: "Gravity" },
        { word: "Zoo", clue: "Animals" },
        { word: "Museum", clue: "History" },
        { word: "Bank", clue: "Money" },
        { word: "Supermarket", clue: "Trolley" },
        { word: "Hotel", clue: "Room Service" },
        { word: "Stadium", clue: "Crowd" },
        { word: "Ciname", clue: "Movie" },
        { word: "Graveyard", clue: "Ghosts" },

        // Objects
        { word: "Laptop", clue: "Keyboard" },
        { word: "Bicycle", clue: "Wheels" },
        { word: "Umbrella", clue: "Rain" },
        { word: "Guitar", clue: "Strings" },
        { word: "Mirror", clue: "Reflection" },
        { word: "Clock", clue: "Time" },
        { word: "Camera", clue: "Photo" },
        { word: "Shoe", clue: "Lace" },
        { word: "Pillow", clue: "Sleep" },
        { word: "Toothbrush", clue: "Paste" },

        // Nature & Animals
        { word: "Sun", clue: "Hot" },
        { word: "Moon", clue: "Night" },
        { word: "Rain", clue: "Wet" },
        { word: "Fire", clue: "Burn" },
        { word: "Snake", clue: "Hiss" },
        { word: "Lion", clue: "Roar" },
        { word: "Fish", clue: "Water" },
        { word: "Bird", clue: "Fly" },
        { word: "Spider", clue: "Web" },
        { word: "Tree", clue: "Leaves" },

        // Professions
        { word: "Dentist", clue: "Teeth" },
        { word: "Pilot", clue: "Fly" },
        { word: "Chef", clue: "Cook" },
        { word: "Firefighter", clue: "Hose" },
        { word: "Actor", clue: "Stage" },
        { word: "Astronaut", clue: "Space" },
        { word: "Clown", clue: "Circus" },
        { word: "Detective", clue: "Mystery" },

        // Activities
        { word: "Swimming", clue: "Pool" },
        { word: "Dancing", clue: "Music" },
        { word: "Singing", clue: "Mic" },
        { word: "Fishing", clue: "Rod" },
        { word: "Camping", clue: "Tent" },
        { word: "Shopping", clue: "Bags" }
    ];

    let players = [];
    let currentPlayerIndex = 0;
    let turnTimerInterval = null;
    let gameTimerDuration = 10 * 60; // 10 minutes in seconds

    // --- DOM Elements ---
    const elements = {
        setupView: document.getElementById('setup-view'),
        revealView: document.getElementById('reveal-view'),
        gameView: document.getElementById('game-view'),

        playerInput: document.getElementById('player-input'),
        addBtn: document.getElementById('add-btn'),
        playerList: document.getElementById('player-list'),
        playerCountMsg: document.getElementById('player-count-msg'),
        startGameBtn: document.getElementById('start-game-btn'),

        currentPlayerName: document.getElementById('current-player-name'),
        identityCard: document.getElementById('identity-card'),
        roleTitle: document.getElementById('role-title'),
        secretWord: document.getElementById('secret-word'),
        roleDesc: document.getElementById('role-desc'),
        nextPlayerBtn: document.getElementById('next-player-btn'),

        timerDisplay: document.getElementById('timer'),
        resetGameBtn: document.getElementById('reset-game-btn')
    };

    // --- Event Listeners ---
    elements.addBtn.addEventListener('click', addPlayer);
    elements.playerInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addPlayer();
    });

    elements.startGameBtn.addEventListener('click', initGame);

    elements.identityCard.addEventListener('click', () => {
        elements.identityCard.classList.toggle('flipped');
    });

    elements.nextPlayerBtn.addEventListener('click', nextPlayerReveal);
    elements.resetGameBtn.addEventListener('click', resetGame);

    // --- Functions ---

    function addPlayer() {
        const name = elements.playerInput.value.trim();
        if (!name) return;

        // Prevent duplicates (optional, but good UX)
        if (players.some(p => p.name.toLowerCase() === name.toLowerCase())) {
            alert("Player already exists!");
            return;
        }

        players.push({ name: name, role: null, word: null });
        elements.playerInput.value = '';
        renderPlayerList();
    }

    function removePlayer(index) {
        players.splice(index, 1);
        renderPlayerList();
    }

    function renderPlayerList() {
        elements.playerList.innerHTML = '';
        players.forEach((player, index) => {
            const li = document.createElement('li');
            li.className = 'player-item';
            li.innerHTML = `
                <span>${player.name}</span>
                <button class="remove-btn" onclick="removePlayerExternal(${index})">&times;</button>
            `;
            elements.playerList.appendChild(li);
        });

        // Update Start Button State
        if (players.length >= 4) {
            elements.startGameBtn.disabled = false;
            elements.playerCountMsg.textContent = `${players.length} Players Ready`;
            elements.playerCountMsg.style.color = '#4ade80'; // Green
        } else {
            elements.startGameBtn.disabled = true;
            elements.playerCountMsg.textContent = `Minimum 4 players required (Current: ${players.length})`;
            elements.playerCountMsg.style.color = 'var(--text-muted)';
        }
    }

    // Expose remove function to global scope for inline onclick
    window.removePlayerExternal = removePlayer;

    function initGame() {
        if (players.length < 4) return;

        // 1. Select Word Pair
        const randomPair = wordList[Math.floor(Math.random() * wordList.length)];

        // 2. Assign Roles (1 Imposter, rest Civilians)
        const imposterIndex = Math.floor(Math.random() * players.length);

        players = players.map((p, i) => {
            const isImposter = i === imposterIndex;
            return {
                ...p,
                role: isImposter ? 'IMPOSTER' : 'CIVILIAN',
                secret: isImposter ? randomPair.clue : randomPair.word,
                instruction: isImposter
                    ? `You are the Imposter! The clue is related to the secret word.`
                    : `The Secret Word is:`
            };
        });

        // 3. Switch to Reveal View
        currentPlayerIndex = 0;
        showRevealScreen();
        switchView('reveal-view');
    }

    function showRevealScreen() {
        const player = players[currentPlayerIndex];

        elements.currentPlayerName.textContent = `Pass phone to ${player.name}`;
        elements.identityCard.classList.remove('flipped'); // Reset flip

        // Update Card Content (Hidden by default until flip)
        // We delay content update slightly to prevent peeking if flipping back fast
        setTimeout(() => {
            elements.roleTitle.textContent = player.role;
            elements.secretWord.textContent = player.secret;
            elements.roleDesc.textContent = player.instruction;

            // Style adjustment for Imposter vs Civilian
            const backFace = document.querySelector('.card-back');
            if (player.role === 'IMPOSTER') {
                backFace.style.background = 'linear-gradient(135deg, #ef4444, #991b1b)';
            } else {
                backFace.style.background = 'linear-gradient(135deg, #3b82f6, #1e40af)';
            }
        }, 300);

        // Update Button Text
        if (currentPlayerIndex === players.length - 1) {
            elements.nextPlayerBtn.textContent = 'Start Game';
        } else {
            elements.nextPlayerBtn.textContent = 'Next Player';
        }
    }

    function nextPlayerReveal() {
        // Ensure card is flipped back or reset state if needed
        if (elements.identityCard.classList.contains('flipped')) {
            elements.identityCard.classList.remove('flipped');
        }

        if (currentPlayerIndex < players.length - 1) {
            currentPlayerIndex++;
            showRevealScreen();
        } else {
            startGameLoop();
        }
    }

    function startGameLoop() {
        switchView('game-view');
        startTimer();
    }

    function startTimer() {
        let timeRemaining = gameTimerDuration;
        updateTimerDisplay(timeRemaining);

        if (turnTimerInterval) clearInterval(turnTimerInterval);

        turnTimerInterval = setInterval(() => {
            timeRemaining--;
            updateTimerDisplay(timeRemaining);

            if (timeRemaining <= 0) {
                clearInterval(turnTimerInterval);
                alert("Time's Up! Discuss and vote for the Imposter.");
            }
        }, 1000);
    }

    function updateTimerDisplay(seconds) {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        elements.timerDisplay.textContent = `${m}:${s < 10 ? '0' : ''}${s}`;
    }

    function resetGame() {
        clearInterval(turnTimerInterval);
        switchView('setup-view');
        // Optional: Keep players or clear? Let's keep players for replayability
        // reset card styles
        elements.identityCard.classList.remove('flipped');
    }

    function switchView(viewId) {
        // Hide all views
        [elements.setupView, elements.revealView, elements.gameView].forEach(el => {
            el.classList.remove('active');
            el.classList.add('hidden'); // Use hidden class for display:none behavior if needed

            // Small timeout for transition effect
            setTimeout(() => {
                if (el.id !== viewId) el.style.display = 'none';
            }, 300);
        });

        // Show target view
        const target = document.getElementById(viewId);
        target.style.display = 'flex'; // Reset display
        // Force reflow
        void target.offsetWidth;
        target.classList.remove('hidden');
        target.classList.add('active');
    }
});
