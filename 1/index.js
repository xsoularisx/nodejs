const colors = require("colors");

const a = Number.parseInt(process.argv[2]);
const b = Number.parseInt(process.argv[3]);

function isPrime(a, b) {

  const primeNumber = [];
  
  if (!Number.isInteger(a && b)) {
    console.log(colors.red('not a number'));
  } else {
    for (let i = a; i <= b; i++) {
      for (let j = 2; j <= i; j++) {
        if (i % j === 0 && j < i) {
          break;
        } else if (j === i) {
          primeNumber.push(i);
        }
      }
    }

    if (primeNumber.length === 0) {
      console.log(colors.red('prime numbers not found'));
    } else {
      for (let i = 0; i < primeNumber.length; i++) {
        if (i % 2 === 0) {
          console.log(colors.green(primeNumber[i]))
        } else {
          console.log(colors.red(primeNumber[i]))
        }
      }
    }
  }

}

console.log(isPrime(a, b));
