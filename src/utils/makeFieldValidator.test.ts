import makeFieldValidator from './makeFieldValidator';

const isValid = () => true;
const isInvalid = () => false;

test('returns a function that validates an empty value', () => {
  expect(makeFieldValidator(isValid)('')).toBe('missing');
});

test('returns a function that handles a valid value', () => {
  expect(makeFieldValidator(isValid)('test')).toBe('valid');
});

test('returns a function that handles an invalid value', () => {
  expect(makeFieldValidator(isInvalid)('test')).toBe('invalid');
});
