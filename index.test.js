// describe('Sum App', () => {

//   const sum = require('./index.js');

//   it('adds 1 + 2 to equal 3', () => {
//     expect(sum(1, 2)).toBe(3);
//   });

//   it('adds positive and negative numbers', () => {
//     expect(sum(-1, 1)).toBe(0);
//   });

//   it('adds decimal numbers', () => {
//     expect(sum(1.25, 1.75)).toBe(3);
//   });
// })


describe('Fizzbuzz', () => {

  const fizzbuzz = require('./index.js');

  it('returns 1 when input is 1', () => {
    const number = 1;

    const result = fizzbuzz(number);

    expect(result).toBe(1);
  });

  it('returns fizz when input is 3', () => {
    const number = 3;

    const result = fizzbuzz(number);

    expect(result).toBe('fizz');
  });

  it('returns buzz when input is 5', () => {
    const number = 5;

    const result = fizzbuzz(number);

    expect(result).toBe('buzz');
  });

  it('returns fizzbuzz when input is 15', () => {
    const number = 15;

    const result = fizzbuzz(number);

    expect(result).toBe('fizzbuzz');
  });





});
