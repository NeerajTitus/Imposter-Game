# Imposter - The Party Game 🕵️‍♂️🎭

**Imposter** is an interactive web-based party game designed for 4 or more players. It challenges players to identify the "Imposter" among them through deduction, questioning, and social engineering.

Built with **React** and **Vite**, featuring a modern glassmorphism design and smooth animations.

## 🚀 Features

-   **Multi-Language Support**: Play in **English** or **Malayalam** 🇮🇳.
-   **Dynamic Roles**: Randomly assigns 1 **Imposter** and multiple **Civilians**.
-   **Custom Difficulty**: Choose from **Easy**, **Medium**, or **Hard** word categories.
-   **Custom Timer**: Set your own game duration (default 10 mins).
-   **Responsive Design**: Mobile-first UI, perfect for passing a single device around.
-   **Vibrant UI**: Dark mode aesthetic with glassmorphism effects and animated backgrounds.

## 🎮 How to Play

1.  **Setup**: Add player names (min 4), select language, difficulty, and set the timer.
2.  **Reveal**: Pass the device to each player. Tap the card to reveal your role:
    *   👤 **Civilian**: You receive a secret word.
    *   🕵️ **Imposter**: You receive a clue related to the word (but not the word itself!).
3.  **Discuss**: Start the timer! Players ask questions to find out who doesn't know the word. The Imposter must blend in and guess the word.
4.  **Vote**: Identify the Imposter before time runs out!

## 🛠️ Tech Stack

-   **Frontend**: React.js
-   **Build Tool**: Vite
-   **Styling**: CSS3 (Variables, Flexbox, Grid, Glassmorphism)

## 📦 Installation & Setup

1.  **Clone the repository**
    ```bash
    git clone https://github.com/yourusername/imposter-game.git
    cd imposter-game
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Run the development server**
    ```bash
    npm run dev
    ```

4.  **Build for production**
    ```bash
    npm run build
    ```

## 📂 Project Structure

```
src/
├── components/      # Game screens (Setup, Reveal, Game, Result)
├── data/            # Word dictionaries (English/Malayalam)
├── App.jsx          # Main game logic & state management
└── index.css        # Global styles & themes
```

---
*Created for fun and chaos at parties!* 🥂
