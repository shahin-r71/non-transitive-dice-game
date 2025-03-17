import { GameErrorHandler } from '../errors/GameErrorHandler.js';

export class DiceParser {
  constructor() {
    // Extract dice configurations from command line arguments
    this.diceConfigs = process.argv.slice(2);
    // Validate minimum number of dice configurations
    if(this.diceConfigs.length <= 2) {
      GameErrorHandler.handleConfigError('At least 3 dice configurations are required.');
    }
  }
  
  // Return parsed dice configurations
  parseDiceConfigs() {
    return this.diceConfigs;
  }
} 
