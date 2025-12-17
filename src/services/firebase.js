import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, get, onValue, update, push, child, remove, onDisconnect } from "firebase/database";
import { getAnalytics } from "firebase/analytics";

// TODO: REPLACE WITH YOUR FIREBASE CONFIGURATION
const firebaseConfig = {
    apiKey: "AIzaSyDtPOjx_pzgUPMY8tLO2zZhw3enT6KwAmc",
    authDomain: "imposter-196eb.firebaseapp.com",
    databaseURL: "https://imposter-196eb-default-rtdb.firebaseio.com/",
    projectId: "imposter-196eb",
    storageBucket: "imposter-196eb.firebasestorage.app",
    messagingSenderId: "965696150662",
    appId: "1:965696150662:web:2b68007c5e52687b810507",
    measurementId: "G-98FN1RPT0K"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const analytics = getAnalytics(app);

// Generate a random 4-letter room code
export const generateRoomCode = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // No I, O, 0, 1 to avoid confusion
    let result = '';
    for (let i = 0; i < 4; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
};

// Create a new room
export const createRoom = async (playerName, settings) => {
    const code = generateRoomCode();
    const roomRef = ref(db, `rooms/${code}`);

    // Check if room exists (collision avoid - rare but possible)
    const snapshot = await get(roomRef);
    if (snapshot.exists()) return createRoom(playerName, settings); // Try again

    // Initial State
    const initialData = {
        gameState: 'LOBBY', // LOBBY, REVEAL, PLAYING, GAME_OVER
        host: playerName,
        settings: settings || { difficulty: 'easy', language: 'english', duration: 10 },
        players: {
            [playerName]: {
                name: playerName,
                isHost: true,
                role: null,
                secret: null
            }
        },
        timer: settings?.duration * 60 || 600
    };

    await set(roomRef, initialData);

    // Remove room on disconnect if only 1 player? Or clear specific player
    // For simplicity, we just handle player removal

    return code;
};

// Join a room
export const joinRoom = async (code, playerName) => {
    const roomRef = ref(db, `rooms/${code}`);
    const snapshot = await get(roomRef);

    if (!snapshot.exists()) {
        throw new Error("Room not found!");
    }

    const roomData = snapshot.val();

    if (roomData.gameState !== 'LOBBY') {
        throw new Error("Game already in progress!");
    }

    const players = roomData.players || {};
    // Check name duplicate
    if (Object.values(players).some(p => p.name.toLowerCase() === playerName.toLowerCase())) {
        throw new Error("Name already taken!");
    }

    // Add player
    await update(ref(db, `rooms/${code}/players/${playerName}`), {
        name: playerName,
        isHost: false,
        role: null,
        secret: null
    });

    // Handle disconnect (remove player)
    const playerRef = ref(db, `rooms/${code}/players/${playerName}`);
    onDisconnect(playerRef).remove();

    return true;
};

// Subscribe to room updates
export const subscribeToRoom = (code, callback) => {
    const roomRef = ref(db, `rooms/${code}`);
    return onValue(roomRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
            // Convert players object to array for easier usage
            const playersList = data.players ? Object.values(data.players) : [];
            callback({ ...data, players: playersList });
        } else {
            callback(null); // Room deleted
        }
    });
};

// Update Game State (Host Only)
export const updateGameState = (code, updates) => {
    return update(ref(db, `rooms/${code}`), updates);
};

// Assign Roles & Start Game logic will move here or remain in App but verify isHost
export { db, ref, set, update };
