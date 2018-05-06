describe('Sum App', () => {

  const sum = require('./index.js');

  it('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3);
  });

  it('adds positive and negative numbers', () => {
      expect(sum(-1,1)).toBe(0);
  });

  it('adds decimal numbers', () => {
    expect(sum(1.25,1.75)).toBe(3);
  });
})
