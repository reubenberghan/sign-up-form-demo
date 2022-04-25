import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Form, {
  usernameMessages,
  passwordMessages,
  passwordConfirmMessages,
} from './Form';

test('renders form with correct controls', () => {
  render(<Form />);

  expect(screen.getByLabelText('Username')).toBeInTheDocument();
  expect(screen.getByLabelText('Password')).toBeInTheDocument();
  expect(screen.getByLabelText('Confirm password')).toBeInTheDocument();
  expect(screen.getByText('Submit')).toBeInTheDocument();
});

test('informs user of missing required fields on submit', () => {
  render(<Form />);

  userEvent.click(screen.getByText('Submit'));

  expect(screen.getByText(usernameMessages.missing)).toBeInTheDocument();
  expect(screen.getByText(passwordMessages.missing)).toBeInTheDocument();
  expect(screen.getByText(passwordConfirmMessages.missing)).toBeInTheDocument();
});

test('informs user of invalid fields on submit', () => {
  render(<Form />);

  userEvent.type(screen.getByLabelText('Username'), 't');
  userEvent.type(screen.getByLabelText('Password'), 't');
  userEvent.type(screen.getByLabelText('Confirm password'), 'e');
  userEvent.click(screen.getByText('Submit'));

  expect(screen.getByText(usernameMessages.invalid)).toBeInTheDocument();
  expect(screen.getByText(passwordMessages.invalid)).toBeInTheDocument();
  expect(screen.getByText(passwordConfirmMessages.invalid)).toBeInTheDocument();
});

test('informs user of valid form submission', () => {
  render(<Form />);

  userEvent.type(screen.getByLabelText('Username'), 'test@test.com');
  userEvent.type(screen.getByLabelText('Password'), 'Q1!');
  userEvent.type(screen.getByLabelText('Confirm password'), 'Q1!');
  userEvent.click(screen.getByText('Submit'));

  expect(
    screen.getByText('Sign-up submitted successfully.')
  ).toBeInTheDocument();
});
