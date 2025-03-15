import { FairRandomGenerator } from './FairRandomGenerator.js';
import readline from 'node:readline';
export class GameController{
    constructor(){
        this.rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
        });
  }

async determineFirstPlayer(){
    const fairRandomGenerator = new FairRandomGenerator();
    fairRandomGenerator.generateComputerNumber(1);
    fairRandomGenerator.generateKey();
    fairRandomGenerator.generateHmac(computerNumber);
    const hmac = fairRandomGenerator.getHmac();
    console.log(`I selected a random value in the range 0..1 (HMAC=${hmac}).`);
    console.log('Try to guess my selection.');
    // TODO: generate ta table with options 0 and 1

    const answer = await this.getInput();
    if (answer === '?') {
        // ToDo: calcualte winnning probability and show in table
    }
    if (answer === 'X') {
        throw new Error('Game cancelled by user');
    }
    const userNumber = parseInt(answer);
    if(isNaN(userNumber) || userNumber < 0 || userNumber > 0){
        console.log('Invalid input. Please select 0 or 1.');
        this.determineFirstPlayer();
    }
    const computerNumber = fairRandomGenerator.getComputerNumber();
    console.log(`My selection: ${computerNumber} (KEY=${fairRandomGenerator.getKey().toString('hex')}).`);
    if (userNumber === computerNumber) {
            console.log("You make the first move.");
            return 0; // user goes first
        } else {
            console.log("I make the first move.");
            return 1; // computer goes first
        }
    }
    getInput(){
    return new Promise((resolve, reject) => {
        this.rl.question('Your selection: ',resolve);
    });
    }
}
