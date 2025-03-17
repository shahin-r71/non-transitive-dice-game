import { printTable } from 'console-table-printer';

// Handles UI table generation for game displays
export class TableGenerator {
    // Displays probability matrix showing win chances between dice
    static generateProbabilityTable(probabilityMatrix) {
        console.log('\nProbability of the win for the user:');
        printTable(probabilityMatrix.matrix, {
            columns: probabilityMatrix.headers
        });
    }
    
    // Creates menu for dice selection with available options
    static generateDiceSelectionMenu(diceList, availableIndices) {
        const options = [];
        diceList.forEach((dice, index) => {
            if (availableIndices.includes(index)) {
                options.push({
                    option: `${index}`,
                    description: dice.toString()
                });
            }
        });
        options.push(
            { option: 'X', description: 'exit' },
            { option: '?', description: 'help' }
        );

        printTable(options, {
            columns: ['option', 'description']
        });
    }

    // Generates number selection menu with values from 0 to maxValue
    static generateNumberSelectionMenu(maxValue) {
        const options = [];
        for (let i = 0; i <= maxValue; i++) {
            options.push({
                option: `${i}`,
                description: `${i}`
            });
        }
        options.push(
            { option: 'X', description: 'exit' },
            { option: '?', description: 'help' }
        );

        printTable(options, {
            columns: ['option', 'description']
        });
    }
}
