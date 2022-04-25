import isEmpty from './isEmpty';

test('handles value undefined', () => {
  expect(isEmpty()).toBe(true);
});

test('handles empty value', () => {
  expect(isEmpty('')).toBe(true);
});

test('handles non-empty value', () => {
  expect(isEmpty('test')).toBe(false);
});
