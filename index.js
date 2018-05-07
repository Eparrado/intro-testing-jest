function sum(a, b) {
  return a + b;
}
module.exports = sum;

function fizzbuzz(n) {
  // return 'fizz';

  if ((n % 5 === 0) && (n % 3 === 0)) {
    return 'fizzbuzz';
  }

  else if (n % 3 === 0) {
    return 'fizz';
  }

  else if (n % 5 === 0) {
    return 'buzz';
  }

  else {
    return n;
  }
}
module.exports = fizzbuzz;