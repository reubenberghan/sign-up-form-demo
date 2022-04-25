import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Sign-up', () => {
  render(<App />);

  expect(screen.getByText('Sign-up')).toBeInTheDocument();
});
