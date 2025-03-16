export class TableGenerator {
    static generateProbabilityTable(probabilityMatrix) {
        console.log('\nProbability of the win for the user:');
        printTable(probabilityMatrix.matrix, {
            columns: probabilityMatrix.headers,
            colorMap: {
                header: 'cyan'
            }
        });
    }
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
            columns: ['option', 'description'],
            colorMap: {
                header: 'cyan'
            }
        });
    }

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
            columns: ['option', 'description'],
            colorMap: {
                header: 'cyan'
            }
        });
    }
}
