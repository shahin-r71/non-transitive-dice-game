# Non-Transitive Dice Game

A command-line implementation of a non-transitive dice game with provably fair random generation.

## 📝 Description

This project implements a dice game based on non-transitive dice. In a non-transitive dice set, the relationship between dice doesn't follow the transitive property. For example, if Dice A tends to beat Dice B, and Dice B tends to beat Dice C, it doesn't necessarily mean that Dice A will beat Dice C. This creates an interesting game dynamic where selecting the right die becomes a strategic decision.

## 🎮 Game Rules

1. The game uses customizable dice with 6 faces, each having different number values.
2. Players take turns choosing dice from the available set.
3. A random roll mechanism with verifiable fairness determines the outcome.
4. The player with the higher number on their die wins the round.
5. The game implements a provably fair random mechanism using cryptographic HMAC verification.
6. Players can view the win probability matrix to make strategic decisions.

## 🔧 Installation

```bash
git clone https://github.com/shahin-r71/non-transitive-dice-game.git
cd non-transitive-dice-game
npm install
```

## 🚀 Usage

Run the game with custom dice configurations:

```bash
npm start "1,2,3,4,5,6" "2,2,4,4,9,9" "6,8,1,1,8,6"
```

Each argument represents a die configuration with 6 face values separated by commas.

## 🔍 Game Commands

During the game:

- Enter a number to select a die or make a throw
- Enter `?` to view the probability matrix (shows winning chances between dice)
- Enter `X` to exit the game

## ⚙️ Technical Features

- **Provably Fair Randomness**: Uses cryptographic HMAC verification to ensure fairness
- **Non-Transitive Dice**: Implements the mathematical property of non-transitivity
- **Probability Calculator**: Shows the winning probabilities between different dice
- **Customizable Dice**: Supports custom dice configurations

## 📦 Dependencies

- readline-sync: For interactive command-line input
- console-table-printer: For displaying formatted tables
- crypto (Node.js built-in): For cryptographic operations

## 🔒 Security

The game uses SHA3-256 HMAC for cryptographic verification, ensuring that random outcomes cannot be manipulated.

<!-- ## 🎬 Demo -->
<!-- [Placeholder for YouTube Video Demo] -->