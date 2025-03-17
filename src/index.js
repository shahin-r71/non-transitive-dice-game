// Import required modules
import { DiceParser } from './core/DiceParser.js';
import { Dice } from './core/Dice.js';
import { GameController } from './core/GameController.js';
import { GameErrorHandler } from './errors/GameErrorHandler.js';

try {
    // Parse dice configurations from command line arguments
    const diceConfigs = new DiceParser().parseDiceConfigs();
    // Convert string configurations to Dice objects
    const diceList = diceConfigs.map(config => Dice.toNumber(config));

    // Initialize game controller with dice list
    const gameController = new GameController(diceList);
    // Start the game
    gameController.play();
} catch (error) {
    GameErrorHandler.handleCriticalError("Failed to start game", error);
}
