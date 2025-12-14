import jwt, { SignOptions } from 'jsonwebtoken';
import { UserModel, CreateUserData } from '../models/User';
import { JWT_SECRET, JWT_EXPIRES_IN } from '../config/jwt';

export interface AuthResponse {
  token: string;
  user: {
    id: number;
    email: string;
    role: string;
  };
}

export class AuthService {
  static async register(data: CreateUserData): Promise<AuthResponse> {
    // Check if user already exists
    const existingUser = await UserModel.findByEmail(data.email);
    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    // Create user
    const user = await UserModel.create(data);

    // Generate token
    const signOptions: SignOptions = {
      expiresIn: JWT_EXPIRES_IN as unknown as number,
    };
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      signOptions
    );

    return {
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    };
  }

  static async login(email: string, password: string): Promise<AuthResponse> {
    // Find user
    const user = await UserModel.findByEmail(email);
    if (!user) {
      throw new Error('Invalid email or password');
    }

    // Verify password
    const isValidPassword = await UserModel.verifyPassword(user, password);
    if (!isValidPassword) {
      throw new Error('Invalid email or password');
    }

    // Generate token
    const signOptions: SignOptions = {
      expiresIn: JWT_EXPIRES_IN as unknown as number,
    };
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      signOptions
    );

    return {
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    };
  }
}

