export class ProbabilityCalculator {
    static calculateWinningProbability(dice1, dice2) {
        let totalWin = 0;
        const totalGames = 36;
        for (let i = 0; i < totalGames; i++) {
            for (let j = 0; j < totalGames; j++) {
                if (dice1.getFaceValue(i) > dice2.getFaceValue(j)) {
                    totalWin++;
                }
            }
        }
        return totalWin / totalGames;
    }

    static calculateProbabilityMatrix(diceList) {
        const headers = diceList.map(dice => dice.toString());

        const Matrix = [];
        for (let i = 0; i < diceList.length; i++) {
            const row = {
                'User dice v': diceList[i].toString()
            };
            for (let j = 0; j < diceList.length; j++) {
                if (i === j || headers[i] === headers[j]) row[headers[i]] = "-0.3333";
                else {
                    row[headers[j]] = this.calculateWinningProbability(diceList[i], diceList[j]).toFixed(4);
                }
            }
            Matrix.push(row);
        }
        return {
            headers: ['User dice v', ...headers],
            matrix: Matrix
        };
    }
}
