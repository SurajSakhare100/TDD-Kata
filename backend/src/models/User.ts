import pool from '../config/database';
import bcrypt from 'bcryptjs';

export interface User {
  id: number;
  email: string;
  password_hash: string;
  role: 'user' | 'admin';
  created_at: Date;
  updated_at: Date;
}

export interface CreateUserData {
  email: string;
  password: string;
  role?: 'user' | 'admin';
}

export class UserModel {
  static async create(data: CreateUserData): Promise<Omit<User, 'password_hash'>> {
    const passwordHash = await bcrypt.hash(data.password, 10);
    const role = data.role || 'user';
    
    const result = await pool.query(
      'INSERT INTO users (email, password_hash, role) VALUES ($1, $2, $3) RETURNING id, email, role, created_at, updated_at',
      [data.email, passwordHash, role]
    );
    
    return result.rows[0];
  }

  static async findByEmail(email: string): Promise<User | null> {
    const result = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );
    
    return result.rows[0] || null;
  }

  static async findById(id: number): Promise<Omit<User, 'password_hash'> | null> {
    const result = await pool.query(
      'SELECT id, email, role, created_at, updated_at FROM users WHERE id = $1',
      [id]
    );
    
    return result.rows[0] || null;
  }

  static async verifyPassword(user: User, password: string): Promise<boolean> {
    return bcrypt.compare(password, user.password_hash);
  }
}

