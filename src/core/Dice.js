export class Dice {
    constructor(faces) {
        if (!Array.isArray(faces) || faces.length !== 6) {
            console.error('Invalid dice configuration, must be an array of arrays each containing 6 faces');
            process.exit(1);
        } 
        this.faces = faces;
    }
    toString() {
        return this.faces.join(',');
    }
    getFaceValue(index) {
        return this.faces[index];
    }
    static toNumber(diceString) {
        const faces = diceString.split(',').map(face =>{
        const value = Number(face.trim());
            if (isNaN(value) || !Number.isInteger(value)) {
                console.error(`Invalid face value: "${value}". Face values must be integers. For example, use "2,2,4,4,9,9".`)
                process.exit(1);
            }
            return value;        
        })
        return new Dice(faces);
    }
}