import { describe, it, expect, vi, beforeEach } from 'vitest';
import { sweetService } from '../sweetService';
import apiClient from '../api';

vi.mock('../api');

describe('sweetService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getAll', () => {
    it('fetches all sweets without filters', async () => {
      const mockSweets = [
        { id: 1, name: 'Chocolate', category: 'Candy', price: 5.99, quantity: 10 },
      ];
      vi.mocked(apiClient.get).mockResolvedValue({ data: mockSweets });

      const result = await sweetService.getAll();

      expect(apiClient.get).toHaveBeenCalledWith('/api/sweets');
      expect(result).toEqual(mockSweets);
    });

    it('fetches sweets with filters', async () => {
      const mockSweets = [
        { id: 1, name: 'Chocolate', category: 'Candy', price: 5.99, quantity: 10 },
      ];
      vi.mocked(apiClient.get).mockResolvedValue({ data: mockSweets });

      const filters = { name: 'Chocolate', minPrice: 5 };
      const result = await sweetService.getAll(filters);

      expect(apiClient.get).toHaveBeenCalledWith('/api/sweets/search?name=Chocolate&minPrice=5');
      expect(result).toEqual(mockSweets);
    });
  });

  describe('create', () => {
    it('creates a new sweet', async () => {
      const newSweet = {
        name: 'Test Sweet',
        category: 'Candy',
        price: 3.99,
        quantity: 10,
      };
      const mockResponse = { id: 1, ...newSweet };
      vi.mocked(apiClient.post).mockResolvedValue({ data: mockResponse });

      const result = await sweetService.create(newSweet);

      expect(apiClient.post).toHaveBeenCalledWith('/api/sweets', newSweet);
      expect(result).toEqual(mockResponse);
    });
  });

  describe('update', () => {
    it('updates a sweet', async () => {
      const updateData = { name: 'Updated Sweet', price: 4.99 };
      const mockResponse = { id: 1, name: 'Updated Sweet', category: 'Candy', price: 4.99, quantity: 10 };
      vi.mocked(apiClient.put).mockResolvedValue({ data: mockResponse });

      const result = await sweetService.update(1, updateData);

      expect(apiClient.put).toHaveBeenCalledWith('/api/sweets/1', updateData);
      expect(result).toEqual(mockResponse);
    });
  });

  describe('delete', () => {
    it('deletes a sweet', async () => {
      vi.mocked(apiClient.delete).mockResolvedValue({});

      await sweetService.delete(1);

      expect(apiClient.delete).toHaveBeenCalledWith('/api/sweets/1');
    });
  });

  describe('purchase', () => {
    it('purchases a sweet with default quantity', async () => {
      const mockResponse = { id: 1, name: 'Chocolate', category: 'Candy', price: 5.99, quantity: 9 };
      vi.mocked(apiClient.post).mockResolvedValue({ data: mockResponse });

      const result = await sweetService.purchase(1);

      expect(apiClient.post).toHaveBeenCalledWith('/api/sweets/1/purchase', { quantity: 1 });
      expect(result).toEqual(mockResponse);
    });

    it('purchases a sweet with custom quantity', async () => {
      const mockResponse = { id: 1, name: 'Chocolate', category: 'Candy', price: 5.99, quantity: 8 };
      vi.mocked(apiClient.post).mockResolvedValue({ data: mockResponse });

      const result = await sweetService.purchase(1, 2);

      expect(apiClient.post).toHaveBeenCalledWith('/api/sweets/1/purchase', { quantity: 2 });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('restock', () => {
    it('restocks a sweet', async () => {
      const mockResponse = { id: 1, name: 'Chocolate', category: 'Candy', price: 5.99, quantity: 15 };
      vi.mocked(apiClient.post).mockResolvedValue({ data: mockResponse });

      const result = await sweetService.restock(1, 5);

      expect(apiClient.post).toHaveBeenCalledWith('/api/sweets/1/restock', { quantity: 5 });
      expect(result).toEqual(mockResponse);
    });
  });
});

