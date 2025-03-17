// Error handler utility for game errors
export class GameErrorHandler {
  // ANSI color codes for terminal output
  static #colors = {
    red: '\x1b[31m',
    yellow: '\x1b[33m',
    reset: '\x1b[0m',
    bold: '\x1b[1m'
  };

  // Handles user input errors
  static handleInputError(message) {
    console.error(`\n${this.#colors.yellow}${this.#colors.bold}Input error:${this.#colors.reset} ${message}`);
    // No exit - continue game
  }

  // Handles user cancellation
  static handleGameCancelled() {
    console.error(`\n${this.#colors.yellow}Game cancelled by user${this.#colors.reset}`);
    process.exit(0); // Clean exit
  }

  // Handles configuration errors
  static handleConfigError(message) {
    console.error(`\n${this.#colors.red}${this.#colors.bold}Configuration error:${this.#colors.reset} ${message}`);
    console.error(`Usage: npm start "1,2,3,4,5,6" "2,2,4,4,9,9" "6,8,1,1,8,6"`);
    process.exit(1);
  }

  // Handles critical errors
  static handleCriticalError(message, error = null) {
    console.error(`\n${this.#colors.red}${this.#colors.bold}Error:${this.#colors.reset} ${message}`);
    if (error && error.stack) {
      console.error(error.stack);
    }
    process.exit(1);
  }
} 