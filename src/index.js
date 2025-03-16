import { DiceParser } from './core/DiceParser.js';
import { Dice } from './core/Dice.js';
import { GameController } from './core/GameController.js';

const diceConfigs = new DiceParser().parseDiceConfigs();

const diceList = diceConfigs.map(config => Dice.toNumber(config));

const gameController = new GameController(diceList);
gameController.play().catch(error => {
    console.error('Error:', error);
    process.exit(1);
});
// console.log(dice);
// console.log(diceconfigs[1]);

