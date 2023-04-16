import { render, screen } from '@testing-library/react';
import HelloWorld from './HelloWorld';

describe('HelloWorld Component', () => {
  it('should have hello world message', () => {
    render(<HelloWorld />);
    const title = screen.getByRole('heading', { level: 1 });
    expect(title).toHaveTextContent('Hello World');
  });
});
