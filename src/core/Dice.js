import { GameErrorHandler } from '../errors/GameErrorHandler.js';

export class Dice {
    // Creates a new dice with specified face values
    constructor(faces) {
        if (!Array.isArray(faces) || faces.length !== 6) {
            GameErrorHandler.handleConfigError('Dice must have exactly 6 faces');
        } 
        this.faces = faces;
    }
    
    // Converts dice faces to string representation
    toString() {
        return this.faces.join(',');
    }
    
    // Gets the value of a specific face by index
    getFaceValue(index) {
        return this.faces[index];
    }
    
    // Creates a dice from comma-separated string of face values
    static toNumber(diceString) {
        const faces = diceString.split(',').map(face => {
            const value = Number(face.trim());
            if (isNaN(value) || !Number.isInteger(value)) {
                GameErrorHandler.handleConfigError(`Invalid face value: "${face}". Face values must be integers. For example, use "2,2,4,4,9,9".`);
            }
            return value;        
        });
        return new Dice(faces);
    }
}