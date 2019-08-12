import { findSecondMinimumFromInput } from '../../src/controllers/findsecondminimum';

describe('Test Suite to test findSecondMinimum', () => {
  it('it should return Invalid Input For invalid inputs', () => {
    const numbers = [1];
    expect(findSecondMinimumFromInput(numbers)).toBe('Invalid Input');
  });
  it('it should return the second minimum number', () => {
    const numbers = [1, 3, 4, 5, 8];
    expect(findSecondMinimumFromInput(numbers)).toBe(3);
  });
  it('it should return Invalid Input For Empty Array', () => {
    const numbers = [] as Array<number>;
    expect(findSecondMinimumFromInput(numbers)).toBe('Invalid Input');
  });
});
