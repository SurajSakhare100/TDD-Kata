import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchBar from '../SearchBar';

describe('SearchBar Component', () => {
  const mockOnSearch = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders all search inputs', () => {
    render(<SearchBar onSearch={mockOnSearch} />);

    expect(screen.getByLabelText('Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Category')).toBeInTheDocument();
    expect(screen.getByLabelText('Min Price')).toBeInTheDocument();
    expect(screen.getByLabelText('Max Price')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /reset/i })).toBeInTheDocument();
  });

  it('calls onSearch with filters when search button is clicked', async () => {
    const user = userEvent.setup();
    render(<SearchBar onSearch={mockOnSearch} />);

    const nameInput = screen.getByLabelText('Name');
    const categoryInput = screen.getByLabelText('Category');
    const minPriceInput = screen.getByLabelText('Min Price');
    const searchButton = screen.getByRole('button', { name: /search/i });

    await user.type(nameInput, 'Chocolate');
    await user.type(categoryInput, 'Candy');
    await user.type(minPriceInput, '5');
    await user.click(searchButton);

    expect(mockOnSearch).toHaveBeenCalledWith({
      name: 'Chocolate',
      category: 'Candy',
      minPrice: 5,
    });
  });

  it('resets filters when reset button is clicked', async () => {
    const user = userEvent.setup();
    render(<SearchBar onSearch={mockOnSearch} />);

    const nameInput = screen.getByLabelText('Name') as HTMLInputElement;
    const resetButton = screen.getByRole('button', { name: /reset/i });

    await user.type(nameInput, 'Test');
    await user.click(resetButton);

    expect(nameInput.value).toBe('');
    expect(mockOnSearch).toHaveBeenCalledWith({});
  });
});

