import isValidEmail from './isValidEmail';

test('handles email empty or undefined', () => {
  expect(isValidEmail()).toBe(false);
});

test('returns false for incorrectly formatted email', () => {
  expect(isValidEmail('test')).toBe(false);
  expect(isValidEmail('@test')).toBe(false);
  expect(isValidEmail('test@')).toBe(false);
});

test('returns true for correclty formatted email', () => {
  expect(isValidEmail('test@test')).toBe(true);
  expect(isValidEmail('test@test.com')).toBe(true);
});
