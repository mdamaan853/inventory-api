const crypto = require('crypto');

 function getRandomNumber(length) {
    const chars = '0123456789';
    const charsLength = chars.length;
    let randomSKU = '';

    for (let i = 0; i < length; i++) {
        const randomIndex = crypto.randomInt(0, charsLength);
        randomSKU += chars[randomIndex];
    }

    return randomSKU;
}

module.exports={getRandomNumber}



