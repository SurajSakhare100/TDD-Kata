import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider, useAuth } from '../AuthContext';
import * as authService from '../../services/authService';
import React from 'react';

vi.mock('../../services/authService');

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <BrowserRouter>
    <AuthProvider>{children}</AuthProvider>
  </BrowserRouter>
);

describe('AuthContext', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it('provides initial null user', () => {
    const { result } = renderHook(() => useAuth(), { wrapper });
    expect(result.current.user).toBeNull();
    expect(result.current.isAdmin).toBe(false);
  });

  it('sets user from token in localStorage', async () => {
    const mockToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ0ZXN0QHRlc3QuY29tIiwicm9sZSI6InVzZXIifQ.test';
    localStorage.setItem('token', mockToken);

    const { result } = renderHook(() => useAuth(), { wrapper });

    await waitFor(() => {
      expect(result.current.user).not.toBeNull();
    });
  });

  it('login updates user state', async () => {
    const mockResponse = {
      token: 'test-token',
      user: { id: 1, email: 'test@test.com', role: 'user' },
    };

    vi.mocked(authService.authService.login).mockResolvedValue(mockResponse);

    const { result } = renderHook(() => useAuth(), { wrapper });

    await act(async () => {
      await result.current.login({ email: 'test@test.com', password: 'password' });
    });

    expect(result.current.user).toEqual(mockResponse.user);
    expect(localStorage.getItem('token')).toBe('test-token');
  });

  it('register updates user state', async () => {
    const mockResponse = {
      token: 'test-token',
      user: { id: 1, email: 'new@test.com', role: 'user' },
    };

    vi.mocked(authService.authService.register).mockResolvedValue(mockResponse);

    const { result } = renderHook(() => useAuth(), { wrapper });

    await act(async () => {
      await result.current.register({ email: 'new@test.com', password: 'password' });
    });

    expect(result.current.user).toEqual(mockResponse.user);
    expect(localStorage.getItem('token')).toBe('test-token');
  });

  it('logout clears user state', async () => {
    const mockResponse = {
      token: 'test-token',
      user: { id: 1, email: 'test@test.com', role: 'user' },
    };

    vi.mocked(authService.authService.login).mockResolvedValue(mockResponse);

    const { result } = renderHook(() => useAuth(), { wrapper });

    await act(async () => {
      await result.current.login({ email: 'test@test.com', password: 'password' });
    });

    act(() => {
      result.current.logout();
    });

    expect(result.current.user).toBeNull();
    expect(localStorage.getItem('token')).toBeNull();
  });

  it('isAdmin returns true for admin users', async () => {
    const mockResponse = {
      token: 'test-token',
      user: { id: 1, email: 'admin@test.com', role: 'admin' },
    };

    vi.mocked(authService.authService.login).mockResolvedValue(mockResponse);

    const { result } = renderHook(() => useAuth(), { wrapper });

    await act(async () => {
      await result.current.login({ email: 'admin@test.com', password: 'password' });
    });

    expect(result.current.isAdmin).toBe(true);
  });
});

