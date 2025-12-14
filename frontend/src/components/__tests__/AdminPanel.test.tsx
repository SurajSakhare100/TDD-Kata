import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AdminPanel from '../AdminPanel';
import * as sweetService from '../../services/sweetService';

vi.mock('../../services/sweetService');

describe('AdminPanel Component', () => {
  const mockOnUpdate = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders admin panel with add button', () => {
    render(<AdminPanel onUpdate={mockOnUpdate} />);

    expect(screen.getByText('Admin Panel')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /add new sweet/i })).toBeInTheDocument();
  });

  it('shows form when add button is clicked', async () => {
    const user = userEvent.setup();
    render(<AdminPanel onUpdate={mockOnUpdate} />);

    const addButton = screen.getByRole('button', { name: /add new sweet/i });
    await user.click(addButton);

    expect(screen.getByLabelText('Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Category')).toBeInTheDocument();
    expect(screen.getByLabelText('Price')).toBeInTheDocument();
    expect(screen.getByLabelText('Quantity')).toBeInTheDocument();
  });

  it('calls sweetService.create when form is submitted', async () => {
    const user = userEvent.setup();
    vi.mocked(sweetService.sweetService.create).mockResolvedValue({
      id: 1,
      name: 'Test Sweet',
      category: 'Candy',
      price: 3.99,
      quantity: 10,
    });

    render(<AdminPanel onUpdate={mockOnUpdate} />);

    const addButton = screen.getByRole('button', { name: /add new sweet/i });
    await user.click(addButton);

    await user.type(screen.getByLabelText('Name'), 'Test Sweet');
    await user.type(screen.getByLabelText('Category'), 'Candy');
    await user.type(screen.getByLabelText('Price'), '3.99');
    await user.type(screen.getByLabelText('Quantity'), '10');

    const submitButton = screen.getByRole('button', { name: /create sweet/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(sweetService.sweetService.create).toHaveBeenCalledWith({
        name: 'Test Sweet',
        category: 'Candy',
        price: 3.99,
        quantity: 10,
      });
    });
  });

  it('shows error message on create failure', async () => {
    const user = userEvent.setup();
    vi.mocked(sweetService.sweetService.create).mockRejectedValue({
      response: { data: { error: 'Failed to create' } },
    });

    render(<AdminPanel onUpdate={mockOnUpdate} />);

    const addButton = screen.getByRole('button', { name: /add new sweet/i });
    await user.click(addButton);

    await user.type(screen.getByLabelText('Name'), 'Test Sweet');
    await user.type(screen.getByLabelText('Category'), 'Candy');
    await user.type(screen.getByLabelText('Price'), '3.99');
    await user.type(screen.getByLabelText('Quantity'), '10');

    const submitButton = screen.getByRole('button', { name: /create sweet/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Failed to create')).toBeInTheDocument();
    });
  });
});

