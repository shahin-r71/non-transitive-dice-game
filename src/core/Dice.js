export class Dice {
  constructor(faces) {
    if(!Array.isArray(faces) || faces.length !==6)  throw new Error('Invalid dice configuration, must be an array of arrays each containing 6 faces');
    this.faces = faces;
    // console.log(this.faces);
  }

  static toNumber(diceString) {
    const faces = diceString.split(',').map(face =>{
      const value = Number(face.trim());
      if(isNaN(value) || !Number.isInteger(value))throw new Error(`Invalid face value: "${value}". Face values must be integers. For example, use "2,2,4,4,9,9".`)
      return value;        
    })
    return new Dice(faces);
  }
}

