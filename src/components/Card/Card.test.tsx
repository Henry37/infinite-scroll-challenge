import { render, screen } from '@testing-library/react';
import Card from './Card';

describe('Card', () => {
  it('renders Card component', () => {
    render(<Card name="Test Card" price={10} src="test-src.jpg" alt="test-alt" />);
    const img = screen.getByAltText('test-alt') as HTMLImageElement;
    expect(img.src).toContain('test-src.jpg');
    expect(img.alt).toBe('test-alt');
    expect(screen.getByText('Test Card')).toBeInTheDocument();
    expect(screen.getByText('From $10.00')).toBeInTheDocument();
  });
});