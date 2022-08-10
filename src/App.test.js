import {render, screen} from '@testing-library/react';
import App from './App';

test('renders root path', () => {
  render(<App/>);
  const linkElement = screen.getByText('Capture Maps');
  expect(linkElement).toBeInTheDocument();
});
