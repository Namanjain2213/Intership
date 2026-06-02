import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserRepository } from '../repositories/UserRepository';
import { RegisterDtoType, LoginDtoType } from '../dto/auth.dto';
import { IUser } from '../models/User';

export class AuthService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async register(userData: RegisterDtoType): Promise<{ user: IUser; token: string }> {
    // Check if user already exists
    const existingUser = await this.userRepository.findByEmail(userData.email);
    if (existingUser) {
      throw new Error('User already exists with this email');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(userData.password, 12);

    // Create user
    const user = await this.userRepository.create({
      ...userData,
      password: hashedPassword
    });

    // Generate token
    const token = this.generateToken(user._id);

    return { user, token };
  }

  async login(loginData: LoginDtoType): Promise<{ user: IUser; token: string }> {
    // Find user
    const user = await this.userRepository.findByEmail(loginData.email);
    if (!user) {
      throw new Error('Invalid credentials');
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(loginData.password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }

    // Generate token
    const token = this.generateToken(user._id);

    return { user, token };
  }

  async getUserById(userId: string): Promise<IUser | null> {
    return await this.userRepository.findById(userId);
  }

  private generateToken(userId: string): string {
    const secret = process.env.JWT_SECRET || 'your-secret-key';
    return jwt.sign({ userId }, secret, { expiresIn: '7d' });
  }

  verifyToken(token: string): { userId: string } {
    const secret = process.env.JWT_SECRET || 'your-secret-key';
    return jwt.verify(token, secret) as { userId: string };
  }
}