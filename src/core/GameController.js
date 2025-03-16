import { FairRandomGenerator } from './FairRandomGenerator.js';
import readline from 'node:readline';
import { TableGenerator } from '../ui/TableGenerator.js';
import { ProbabilityCalculator } from './ProbabilityCalculator.js';
export class GameController{
    constructor(diceList) {
        this.diceList = diceList;
        this.computerDiceIndex = null;
        this.userDiceIndex = null;
        this.randomGenerator = new FairRandomGenerator();
        this.readLine = readline.createInterface({
        input: process.stdin,
        output: process.stdout
        });
    }
    async play() {
        try {
            console.log("Let's determine who makes the first move.");
            const computerGoesFirst = await this.determineFirstPlayer();
            await this.setDice(computerGoesFirst);
            const computerThrow = await this.makeThrow(this.diceList[this.computerDiceIndex], true);
            const userThrow = await this.makeThrow(this.diceList[this.userDiceIndex], false);
            this.determineWinner(computerThrow, userThrow);

        } catch (error) {
            console.error('Error:', error);
        } finally {
            this.readLine.close();
        }
        
        
    }

    async determineFirstPlayer(){
        this.randomGenerator.generateComputerNumber(1);
        this.randomGenerator.generateKey();
        this.randomGenerator.generateHmac();
        const hmac = this.randomGenerator.getHmac();
        console.log(`I selected a random value in the range 0..1 (HMAC=${hmac}).`);
        console.log('Try to guess my selection.');
        
        TableGenerator.generateNumberSelectionMenu(1);

        const answer = await this.getInput();
        if (answer === '?') {
            const probabilityMatrix = ProbabilityCalculator.calculateProbabilityMatrix(this.diceList);
            TableGenerator.generateProbabilityTable(probabilityMatrix);
            return this.determineFirstPlayer();
        }
        if (answer === 'X') {
            throw new Error('Game cancelled by user');
        }
        const userNumber = parseInt(answer);
        if(isNaN(userNumber) || userNumber < 0 || userNumber > 1){
            console.log('Invalid input. Please select 0 or 1.');
            return this.determineFirstPlayer();
            
        }
        const computerNumber = this.randomGenerator.getComputerNumber();
        console.log(`My selection: ${computerNumber} (KEY=${this.randomGenerator.getKey().toString('hex')}).`);
        if (userNumber === computerNumber) {
                console.log("You make the first move.");
                return 0; // user goes first
        } else {
            console.log("I make the first move.");
            return 1; // computer goes first
        }
    }
    
    async setDice(computerGoesFirst) {
        if (computerGoesFirst) {
            this.computerDiceIndex = Math.floor(Math.random() * this.diceList.length);
            console.log(`I make the first move and choose the [${this.diceList[this.computerDiceIndex].toString()}] dice.`);
            console.log("choose your dice");

            // TODO: implement user dice selection table
            // TODO: remove computer dice from the list
            const neWdiceList = this.diceList.filter((_, index) => index !== this.computerDiceIndex);
            // pass this list to user selection table
            // TODO: get user choice
            this.userDiceIndex = await this.getInput();
            console.log(`You choose the [${neWdiceList[this.userDiceIndex].toString()}] dice.`);
        }
        else {
            console.log("choose your dice");
            // TODO: implement user dice selection table
            // TODO: get user choice
            this.userDiceIndex = await this.getInput();

            console.log(`You make the first move and choose the [${this.diceList[this.userDiceIndex].toString()}] dice.`);
            const neWdiceList = this.diceList.filter((_, index) => index !== this.userDiceIndex);
            this.computerDiceIndex = Math.floor(Math.random() * neWdiceList.length);
            console.log(`I choose the [${neWdiceList[this.computerDiceIndex].toString()}] dice.`);
       
        }

        
    }
    async makeThrow(dice, isComputer) {
        this.randomGenerator.generateKey();
        this.randomGenerator.generateComputerNumber(5);
        const hmac = this.randomGenerator.generateHmac();
        
        console.log(`It's time for ${isComputer ? 'my' : 'your'} throw.`);

        console.log(`I selected a random value in the range 0..${5} (HMAC=${hmac}).`);
        console.log(`Add your number modulo ${6}.`);

        TableGenerator.generateNumberSelectionMenu(5);

        const answer = await this.getInput();
        if (answer === '?') {
            const probabilityMatrix = ProbabilityCalculator.calculateProbabilityMatrix(this.diceList);
            TableGenerator.generateProbabilityTable(probabilityMatrix);
            return this.makeThrow(dice, isComputer);
        }
        if (answer === 'X') {
            throw new Error('Game cancelled by user');
        }

        const userNumber = parseInt(answer);
        if (isNaN(userNumber) || userNumber < 0 || userNumber >= 6) {
            throw new Error(`Invalid input. Please select a number between 0 and ${dice.getFaceCount() - 1}.`);
        }
        const sum = this.randomGenerator.getComputerNumber() + userNumber;
        const resultIndex = sum % 6;
        console.log(`My number is ${this.randomGenerator.getComputerNumber()} (KEY=${this.randomGenerator.getKey().toString('hex')}).`);
        console.log(`The result is ${this.randomGenerator.getComputerNumber()} + ${userNumber} = ${sum} (mod ${6}).`);

        const throwValue = dice.getFaceValue(resultIndex);
        console.log(`${isComputer ? 'My' : 'Your'} throw is ${throwValue}.`);
        return throwValue;
    }
    determineWinner(computerThrow, userThrow) {
        if (computerThrow > userThrow) {
            console.log(`I win (${computerThrow} > ${userThrow})!`);
        } else if (userThrow > computerThrow) {
            console.log(`You win (${userThrow} > ${computerThrow})!`);
        } else {
            console.log(`It's a tie (${computerThrow} = ${userThrow})!`);
        }
    }
    getInput() {
        return new Promise((resolve) => {
            this.readLine.question('Your selection: ', resolve);
        });
    }
}
