import crypto from 'node:crypto';
export class FairRandomGenerator {
    constructor(){
        this.key = null;
        this.computerNumber = null;
        this.hmac = null;
    }
    generateKey(){
        this.key = crypto.randomBytes(32);
    }
    generateComputerNumber(maxValue){
        this.computerNumber = crypto.randomInt(0,maxValue+1);
    }
    generateHmac(){
        if (!this.key || this.computerNumber === null) {
            console.error('Key and computer number must be set before calculating HMAC');
            process.exit(1);
        }
        this.hmac = crypto.createHmac('sha3-256', this.key).update(this.computerNumber.toString()).digest('hex');
        return this.hmac;
    }
    getComputerNumber(){
        return this.computerNumber;
    }
    getHmac(){
        return this.hmac;
    }
    getKey(){
        return this.key;
    }
}