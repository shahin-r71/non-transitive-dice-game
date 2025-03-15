import { DiceParser } from './core/DiceParser.js';

const diceParser = new DiceParser();
const diceconfigs = diceParser.parseDiceConfigs();

console.log(diceconfigs);

