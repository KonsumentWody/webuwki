const readline = require('readline');

let favoriteNumber = 7;
const maxNumber = 10;
var totalSum = 0;


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function isEven(number) {
    if (number % 2 === 0) {
        return true;
    } else {
        return false;
    }
}

function calculateSum(numbers) {
    let sum = 0;
    for (let i = 0; i < numbers.length; i++) {
        sum += numbers[i];
    }
    return sum;
}

function main() {

    
    rl.question('Jaka jest Twoja ulubiona liczba? ', (number) => {
        if (number.trim() && !isNaN(number)) {
            favoriteNumber = parseInt(number);
        }
        
        console.log(`Twoja ulubiona liczba to ${favoriteNumber}!`);
        
        console.log('\nLiczby od 1 do', maxNumber, ':');
        for (let i = 1; i <= maxNumber; i++) {
            console.log(`${i} jest ${isEven(i) ? 'parzysta' : 'nieparzysta'}`);
        }
        
        let counter = 1;
        let evenNumbers = [];
        while (counter <= 5) {
            if (isEven(counter)) {
                evenNumbers.push(counter);
            }
            counter++;
        }
        
        totalSum = calculateSum(evenNumbers);
        console.log(`\nLiczby parzyste od 1 do 5: ${evenNumbers}`);
        console.log(`Suma liczb parzystych: ${totalSum}`);
        console.log(`Twoja ulubiona liczba: ${favoriteNumber} ${isEven(favoriteNumber) ? 'jest parzysta' : 'jest nieparzysta'}!`);
        
        rl.close();
    });
}

main();