import { DiceParser } from './core/DiceParser.js';
import { Dice } from './core/Dice.js';
const diceParser = new DiceParser();
const diceconfigs = diceParser.parseDiceConfigs();

const dice= diceconfigs.map(d=>Dice.toNumber(d));

console.log(dice[0].faces);
// console.log(diceconfigs[1]);

