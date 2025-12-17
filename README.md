# Imposter - The Ultimate Party Game 🕵️‍♂️🎭

**Imposter** is a modern, web-based social deduction game designed to test your lying skills and ability to detect deception. Whether you're in the same room or miles apart, Imposter brings the thrill of finding the hidden traitor to your group.

Built with **React**, **Vite**, and **Firebase**, featuring a stunning glassmorphism UI.

## 🌟 Game Modes

### 📱 1. Pass & Play (Local)
*   **Best for**: A group of friends in the same room with **one device**.
*   **How it works**: Enter player names, then pass the phone around. Each player taps to see their role hidden from others.

### 🌍 2. Play Online (Multiplayer)
*   **Best for**: Remote play or everyone using their **own phone**.
*   **How it works**: One person hosts a room and shares the 4-letter code. Everyone joins from their own browser. The game state (timer, turns, phases) is synced in real-time!

## 🚀 Key Features

*   **Multi-Language Support**: Fully localized for **English** and **Malayalam** (മലയാളം).
*   **Custom Difficulty**: Three levels of word abstraction - **Easy** (Objects), **Medium** (Places), **Hard** (Abstract Concepts).
*   **Flexible Timer**: Set your own game duration (1-20 minutes).
*   **Dynamic Roles**: Randomly assigns 1 Imposter and multiple Civilians.
*   **Responsive Design**: Looks great on Mobile, Tablet, and Desktop.

## 🎮 How to Play

1.  **Select Mode**: Choose "Pass & Play" or "Play Online".
2.  **Setup**:
    *   **Local**: Add player names.
    *   **Online**: Host creates a room; others join with the Room Code.
3.  **Reveal Phase**:
    *   **Civilian**: You receive a secret word (e.g., "Library").
    *   **Imposter**: You receive a clue (e.g., "Silence"), but NOT the word.
4.  **Discussion**: The timer starts! Ask questions to find out who doesn't know the word. The Imposter must bluff and try to guess the word.
5.  **Vote**: When time is up (or before), identify the Imposter to win!

## 🛠️ Tech Stack

*   **Frontend**: React.js (Hooks, Functional Components)
*   **Build Tool**: Vite
*   **Backend / Realtime**: Firebase Realtime Database
*   **Styling**: Plain CSS3 (Glassmorphism, CSS Variables, Flexbox/Grid)
*   **Deployment**: Vercel

## 📦 Installation (For Developers)

1.  **Clone the repository**
    ```bash
    git clone https://github.com/yourusername/imposter-game.git
    cd imposter-game
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Setup Firebase**
    *   Create a project at [Firebase Console](https://console.firebase.google.com/).
    *   Create a Web App and get logic keys.
    *   Update `src/services/firebase.js` with your config.

4.  **Run Locally**
    ```bash
    npm run dev
    ```

---
*Trust No One. Suspect Everyone.* 🥂

