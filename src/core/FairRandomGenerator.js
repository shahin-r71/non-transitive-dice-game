import crypto from 'node:crypto';

// Handles cryptographic operations for fair random number generation
export class FairRandomGenerator {
    constructor(){
        this.key = null;
        this.computerNumber = null;
        this.hmac = null;
    }
    
    // Generates a random cryptographic key
    generateKey(){
        this.key = crypto.randomBytes(32);
    }
    
    // Creates a random number within specified range
    generateComputerNumber(maxValue){
        this.computerNumber = crypto.randomInt(0,maxValue+1);
    }
    
    // Creates HMAC using key and computer number
    generateHmac(){
        if (!this.key || this.computerNumber === null) {
            console.error('Key and computer number must be set before calculating HMAC');
            process.exit(1);
        }
        this.hmac = crypto.createHmac('sha3-256', this.key).update(this.computerNumber.toString()).digest('hex');
        return this.hmac;
    }
    
    // Returns the generated computer number
    getComputerNumber(){
        return this.computerNumber;
    }
    
    // Returns the calculated HMAC
    getHmac(){
        return this.hmac;
    }
    
    // Returns the cryptographic key
    getKey(){
        return this.key;
    }
}