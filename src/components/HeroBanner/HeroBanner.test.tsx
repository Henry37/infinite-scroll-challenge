import { render } from '@testing-library/react';
import HeroBanner from './HeroBanner';

describe('HeroBanner', () => {
  it('has correct background image style', () => {
    const { container } = render(<HeroBanner />);
    const section = container.querySelector('section');
    expect(section).toHaveStyle({
      backgroundImage: "url('/hero-image.png')",
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
    });
  });

  it('renders two h1 elements with correct text', () => {
    const { getAllByRole } = render(<HeroBanner />);
    const headings = getAllByRole('heading', { level: 1 });
    expect(headings).toHaveLength(2);
    expect(headings[0]).toHaveTextContent('Your workspace.');
    expect(headings[1]).toHaveTextContent('Reinvented.');
  });
});