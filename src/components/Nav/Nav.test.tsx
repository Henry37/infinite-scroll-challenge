import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Nav from './Nav';

describe('Nav Component', () => {
  it('renders Nav component', () => {
    render(<Nav />);
    
    const desktopNav = screen.getByTestId('desktop-nav');
    expect(desktopNav).toBeInTheDocument();
    expect(screen.getByText('Function', { selector: '[data-testid="desktop-nav"] a' })).toBeInTheDocument();
    expect(screen.getByText('Collection', { selector: '[data-testid="desktop-nav"] a' })).toBeInTheDocument();
    expect(screen.getByText('Configuration', { selector: '[data-testid="desktop-nav"] a' })).toBeInTheDocument();
    expect(screen.getByText('About', { selector: '[data-testid="desktop-nav"] a' })).toBeInTheDocument();
  });

  it('opens menu on button click', async () => {
    render(<Nav />);
    const button = screen.getByRole('button');
    await userEvent.click(button);

    const mobileNav = screen.getByTestId('mobile-nav');
    expect(mobileNav).toBeVisible();
    expect(screen.getByText('Function', { selector: '[data-testid="mobile-nav"] a' })).toBeVisible();
    expect(screen.getByText('Collection', { selector: '[data-testid="mobile-nav"] a' })).toBeVisible();
    expect(screen.getByText('Configuration', { selector: '[data-testid="mobile-nav"] a' })).toBeVisible();
    expect(screen.getByText('About', { selector: '[data-testid="mobile-nav"] a' })).toBeVisible();
  });

  it('closes menu on button click again', async () => {
    render(<Nav />);
    const button = screen.getByRole('button');
    // Open the menu
    await userEvent.click(button); 
    // Close the menu
    await userEvent.click(button); 

    const mobileNav = screen.queryByTestId('mobile-nav');
    expect(mobileNav).not.toBeInTheDocument();
  });
});
