import apiClient from './api';
import { Sweet } from '../types';

// Helper function to normalize sweet data (convert string numbers to numbers)
const normalizeSweet = (sweet: any): Sweet => ({
  ...sweet,
  id: typeof sweet.id === 'number' ? sweet.id : parseInt(String(sweet.id)),
  price: typeof sweet.price === 'number' ? sweet.price : parseFloat(String(sweet.price || 0)),
  quantity: typeof sweet.quantity === 'number' ? sweet.quantity : parseInt(String(sweet.quantity || 0)),
});

export interface SearchFilters {
  name?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
}

export interface CreateSweetData {
  name: string;
  category: string;
  price: number;
  quantity: number;
}

export interface UpdateSweetData {
  name?: string;
  category?: string;
  price?: number;
  quantity?: number;
}

export const sweetService = {
  async getAll(filters?: SearchFilters): Promise<Sweet[]> {
    const params = filters ? new URLSearchParams() : undefined;
    if (filters) {
      if (filters.name) params!.append('name', filters.name);
      if (filters.category) params!.append('category', filters.category);
      if (filters.minPrice !== undefined) params!.append('minPrice', filters.minPrice.toString());
      if (filters.maxPrice !== undefined) params!.append('maxPrice', filters.maxPrice.toString());
    }
    
    const url = filters && params?.toString() 
      ? `/api/sweets/search?${params.toString()}`
      : '/api/sweets';
    
    const response = await apiClient.get<Sweet[]>(url);
    return response.data.map(normalizeSweet);
  },

  async getById(id: number): Promise<Sweet> {
    const response = await apiClient.get<Sweet>(`/api/sweets/${id}`);
    return normalizeSweet(response.data);
  },

  async create(data: CreateSweetData): Promise<Sweet> {
    const response = await apiClient.post<Sweet>('/api/sweets', data);
    return normalizeSweet(response.data);
  },

  async update(id: number, data: UpdateSweetData): Promise<Sweet> {
    const response = await apiClient.put<Sweet>(`/api/sweets/${id}`, data);
    return normalizeSweet(response.data);
  },

  async delete(id: number): Promise<void> {
    await apiClient.delete(`/api/sweets/${id}`);
  },

  async purchase(id: number, quantity: number = 1): Promise<Sweet> {
    const response = await apiClient.post<Sweet>(`/api/sweets/${id}/purchase`, { quantity });
    return normalizeSweet(response.data);
  },

  async restock(id: number, quantity: number): Promise<Sweet> {
    const response = await apiClient.post<Sweet>(`/api/sweets/${id}/restock`, { quantity });
    return normalizeSweet(response.data);
  },
};

