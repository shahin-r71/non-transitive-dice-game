export class DiceParser {
  constructor() {
    this.diceConfigs = process.argv.slice(2);
    if(this.diceConfigs.length <= 2) {
      console.error('Error: At least 3 dice configurations are required.');
      console.error('Usage: node index.js "1,2,3,4,5,6" "2,2,4,4,9,9" "6,8,1,1,8,6"');
      process.exit(1);
    }
  }
  parseDiceConfigs() {
    return this.diceConfigs;
  }
} 

