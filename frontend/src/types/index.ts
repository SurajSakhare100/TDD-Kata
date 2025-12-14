export interface User {
  id: string;
  email: string;
  role: 'user' | 'admin';
}

export interface Sweet {
  id: string;
  name: string;
  category: string;
  price: number;
  quantity: number;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  role?: 'user' | 'admin';
}

