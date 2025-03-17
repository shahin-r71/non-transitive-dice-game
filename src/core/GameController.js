import { FairRandomGenerator } from './FairRandomGenerator.js';
import readline from 'readline-sync';
import { TableGenerator } from '../ui/TableGenerator.js';
import { ProbabilityCalculator } from './ProbabilityCalculator.js';
export class GameController{
    constructor(diceList) {
        this.diceList = diceList;
        this.computerDiceIndex = null;
        this.userDiceIndex = null;
        this.randomGenerator = new FairRandomGenerator();
    }
    play() {   
        console.log("Let's determine who makes the first move.");
        const computerGoesFirst =  this.determineFirstPlayer();
        this.setDice(computerGoesFirst);
        const computerThrow =  this.makeThrow(this.diceList[this.computerDiceIndex], true);
        const userThrow =  this.makeThrow(this.diceList[this.userDiceIndex], false);
        this.determineWinner(computerThrow, userThrow);
    }

    determineFirstPlayer(){
        this.randomGenerator.generateComputerNumber(1);
        this.randomGenerator.generateKey();
        this.randomGenerator.generateHmac();
        const hmac = this.randomGenerator.getHmac();
        const computerNumber = this.randomGenerator.getComputerNumber();
        
        let userNumber;
        while (true) {
            console.log(`I selected a random value in the range 0..1 (HMAC=${hmac}).`);
            console.log('Try to guess my selection.');
            TableGenerator.generateNumberSelectionMenu(1);
    
            const userInput = readline.question("Your selection: ");
            if (userInput === '?') {
                const probabilityMatrix = ProbabilityCalculator.calculateProbabilityMatrix(this.diceList);
                TableGenerator.generateProbabilityTable(probabilityMatrix);
                continue;
            }
            if (userInput === 'X' || userInput === 'x') {
                console.error('Game cancelled by user');
                process.exit(1);
            }
            userNumber = parseInt(userInput);
            if (!isNaN(userNumber) && (userNumber === 0 || userNumber === 1)) break;
            console.error('Invalid input. Please remember to select 0 or 1 next time.');
        }
        console.log(`My selection: ${computerNumber} (KEY=${this.randomGenerator.getKey().toString('hex')}).`);
        return userNumber === computerNumber? 0: 1;
    }
    
    setDice(computerGoesFirst) {
        if (computerGoesFirst) {
            this.computerDiceIndex = Math.floor(Math.random() * this.diceList.length);
            const availableIndices = this.diceList.map((_, index) => index).filter(index => index !== this.computerDiceIndex);
            console.log(`I make the first move and I choose the [${this.diceList[this.computerDiceIndex].toString()}] dice.`);

            while (true) {
                console.log("choose your dice");
                TableGenerator.generateDiceSelectionMenu(this.diceList, availableIndices);

                const userInput = readline.question("Your selection: ");
                if (userInput === 'X' || userInput === 'x') {
                    console.error('Game cancelled by user');
                    process.exit(1);
                }
                if (userInput === '?') {
                    const probabilityMatrix = ProbabilityCalculator.calculateProbabilityMatrix(this.diceList);
                    TableGenerator.generateProbabilityTable(probabilityMatrix);
                    continue;
                }
                this.userDiceIndex = parseInt(userInput);
                if (isNaN(this.userDiceIndex) || !availableIndices.includes(this.userDiceIndex)) {
                    console.error('Invalid selection. Please remember to choose from available dice next time .');
                    continue;
                }
                console.log(`You choose the [${this.diceList[this.userDiceIndex].toString()}] dice.`);
                break;
            }
        }
        else {
            const availableIndices = this.diceList.map((_, index) => index);
            while (true) {
                console.log("choose your dice");
                TableGenerator.generateDiceSelectionMenu(this.diceList, availableIndices);
                
                const userInput = readline.question("Your selection: ");
                if (userInput === 'X' || userInput === 'x') {
                    console.error('Game cancelled by user');
                    process.exit(1);
                }
                if (userInput === '?') {
                    const probabilityMatrix = ProbabilityCalculator.calculateProbabilityMatrix(this.diceList);
                    TableGenerator.generateProbabilityTable(probabilityMatrix);
                    continue;
                }
                
                this.userDiceIndex = parseInt(userInput);
                if (isNaN(this.userDiceIndex) || !availableIndices.includes(this.userDiceIndex)) {
                    console.error('Invalid selection. Please remember to choose from available dice next time.');
                    continue;
                }
                console.log(`You make the first move and choose the [${this.diceList[this.userDiceIndex].toString()}] dice.`);
                break;
            }
            const remainingIndices = availableIndices.filter(index => index !== this.userDiceIndex);
            this.computerDiceIndex = remainingIndices[Math.floor(Math.random() * remainingIndices.length)];
            console.log(`I choose the [${this.diceList[this.computerDiceIndex].toString()}] dice.`);
        }
    }
     makeThrow(dice, isComputer) {
        this.randomGenerator.generateKey();
        this.randomGenerator.generateComputerNumber(5);
        this.randomGenerator.generateHmac();
        const hmac = this.randomGenerator.getHmac();  
        console.log(`It's time for ${isComputer ? 'my' : 'your'} throw.`);
         
        let userNumber;
         while (true) {
            console.log(`I selected a random value in the range 0..5 (HMAC=${hmac}).`);
            console.log(`Add your number modulo ${6}.`);
            TableGenerator.generateNumberSelectionMenu(5);
    
            const userInput = readline.question("Your selection: ");
            if (userInput === '?') {
                const probabilityMatrix = ProbabilityCalculator.calculateProbabilityMatrix(this.diceList);
                TableGenerator.generateProbabilityTable(probabilityMatrix);
                continue;
            }
            if (userInput === 'X' || userInput === 'x') {
                console.error('Game cancelled by user');
                process.exit(1);
            }
    
            userNumber = parseInt(userInput);
            if (isNaN(userNumber) || userNumber < 0 || userNumber >= 6) {
                console.error(`Invalid input. Please remember to select a number between 0 and 5 next time.`);
                continue;   
            }
            break;
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
    
}

