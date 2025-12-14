import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SweetCard from '../SweetCard';
import { Sweet } from '../../types';
import * as sweetService from '../../services/sweetService';

vi.mock('../../services/sweetService');

const mockSweet: Sweet = {
  id: 1,
  name: 'Test Chocolate',
  category: 'Chocolate',
  price: 5.99,
  quantity: 10,
};

const mockSweetOutOfStock: Sweet = {
  ...mockSweet,
  quantity: 0,
};

describe('SweetCard Component', () => {
  const mockOnPurchase = vi.fn();
  const mockOnUpdate = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders sweet information', () => {
    render(
      <SweetCard
        sweet={mockSweet}
        onPurchase={mockOnPurchase}
        onUpdate={mockOnUpdate}
        isAdmin={false}
      />
    );

    expect(screen.getByText('Test Chocolate')).toBeInTheDocument();
    expect(screen.getByText('Chocolate')).toBeInTheDocument();
    expect(screen.getByText('$5.99')).toBeInTheDocument();
    expect(screen.getByText(/Stock: 10/)).toBeInTheDocument();
  });

  it('disables purchase button when quantity is 0', () => {
    render(
      <SweetCard
        sweet={mockSweetOutOfStock}
        onPurchase={mockOnPurchase}
        onUpdate={mockOnUpdate}
        isAdmin={false}
      />
    );

    const purchaseButton = screen.getByRole('button', { name: /purchase/i });
    expect(purchaseButton).toBeDisabled();
  });

  it('calls onPurchase when purchase button is clicked', async () => {
    const user = userEvent.setup();
    render(
      <SweetCard
        sweet={mockSweet}
        onPurchase={mockOnPurchase}
        onUpdate={mockOnUpdate}
        isAdmin={false}
      />
    );

    const purchaseButton = screen.getByRole('button', { name: /purchase/i });
    await user.click(purchaseButton);

    expect(mockOnPurchase).toHaveBeenCalledWith(mockSweet.id);
  });

  it('shows admin actions when user is admin', () => {
    render(
      <SweetCard
        sweet={mockSweet}
        onPurchase={mockOnPurchase}
        onUpdate={mockOnUpdate}
        isAdmin={true}
      />
    );

    expect(screen.getByRole('button', { name: /edit/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /restock/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /delete/i })).toBeInTheDocument();
  });

  it('does not show admin actions when user is not admin', () => {
    render(
      <SweetCard
        sweet={mockSweet}
        onPurchase={mockOnPurchase}
        onUpdate={mockOnUpdate}
        isAdmin={false}
      />
    );

    expect(screen.queryByRole('button', { name: /edit/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /restock/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /delete/i })).not.toBeInTheDocument();
  });

  it('calls delete service when delete is confirmed', async () => {
    const user = userEvent.setup();
    vi.mocked(sweetService.sweetService.delete).mockResolvedValue();
    window.confirm = vi.fn(() => true);

    render(
      <SweetCard
        sweet={mockSweet}
        onPurchase={mockOnPurchase}
        onUpdate={mockOnUpdate}
        isAdmin={true}
      />
    );

    const deleteButton = screen.getByRole('button', { name: /delete/i });
    await user.click(deleteButton);

    await waitFor(() => {
      expect(sweetService.sweetService.delete).toHaveBeenCalledWith(mockSweet.id);
    });
  });
});

