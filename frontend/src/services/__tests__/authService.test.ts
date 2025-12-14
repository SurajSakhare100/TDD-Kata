import { describe, it, expect, vi, beforeEach } from 'vitest';
import { authService } from '../authService';
import apiClient from '../api';

vi.mock('../api');

describe('authService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('login', () => {
    it('calls login endpoint with credentials', async () => {
      const credentials = { email: 'test@test.com', password: 'password123' };
      const mockResponse = {
        token: 'test-token',
        user: { id: 1, email: 'test@test.com', role: 'user' },
      };
      vi.mocked(apiClient.post).mockResolvedValue({ data: mockResponse });

      const result = await authService.login(credentials);

      expect(apiClient.post).toHaveBeenCalledWith('/api/auth/login', credentials);
      expect(result).toEqual(mockResponse);
    });
  });

  describe('register', () => {
    it('calls register endpoint with user data', async () => {
      const userData = { email: 'new@test.com', password: 'password123' };
      const mockResponse = {
        token: 'test-token',
        user: { id: 1, email: 'new@test.com', role: 'user' },
      };
      vi.mocked(apiClient.post).mockResolvedValue({ data: mockResponse });

      const result = await authService.register(userData);

      expect(apiClient.post).toHaveBeenCalledWith('/api/auth/register', userData);
      expect(result).toEqual(mockResponse);
    });
  });
});

