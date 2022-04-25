import isValidPassword from './isValidPassword';

test('handles password empty or undefined', () => {
  expect(isValidPassword()).toBe(false);
});

test('ensures password must contain one uppercase, one numeric, and one special character', () => {
  expect(isValidPassword('Q1!')).toBe(true);
});
