import { dummyCalculator } from './dummy';

test('dummy calculator', () => {
  expect(dummyCalculator()).toBe('calculator');
});
