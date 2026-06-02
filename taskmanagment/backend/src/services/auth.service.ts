import bcrypt from 'bcrypt';
import { User } from '@prisma/client';
import { UserRepository } from '../repositories/user.repository';
import { RegisterUserDtoType, LoginUserDtoType, UpdateProfileDtoType } from '../dtos/auth.dto';
import { generateTokenPair } from '../utils/jwt';

/**
 * Authentication service handling user registration, login, and profile management
 */
export class AuthService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  /**
   * Register a new user
   * @param userData - User registration data
   * @returns Created user and tokens
   */
  async register(userData: RegisterUserDtoType): Promise<{
    user: Omit<User, 'password'>;
    accessToken: string;
    refreshToken: string;
  }> {
    const { email, name, password } = userData;

    // Check if user already exists
    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    // Hash password
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create user
    const user = await this.userRepository.create({
      email,
      name,
      password: hashedPassword,
    });

    // Generate tokens
    const tokens = generateTokenPair({
      userId: user.id,
      email: user.email,
    });

    // Return user without password
    const { password: _, ...userWithoutPassword } = user;

    return {
      user: userWithoutPassword,
      ...tokens,
    };
  }

  /**
   * Login user
   * @param loginData - User login credentials
   * @returns User and tokens
   */
  async login(loginData: LoginUserDtoType): Promise<{
    user: Omit<User, 'password'>;
    accessToken: string;
    refreshToken: string;
  }> {
    const { email, password } = loginData;

    // Find user by email
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new Error('Invalid email or password');
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid email or password');
    }

    // Generate tokens
    const tokens = generateTokenPair({
      userId: user.id,
      email: user.email,
    });

    // Return user without password
    const { password: _, ...userWithoutPassword } = user;

    return {
      user: userWithoutPassword,
      ...tokens,
    };
  }

  /**
   * Get user profile by ID
   * @param userId - User ID
   * @returns User profile
   */
  async getProfile(userId: string): Promise<Omit<User, 'password'> | null> {
    return this.userRepository.findById(userId);
  }

  /**
   * Update user profile
   * @param userId - User ID
   * @param updateData - Profile update data
   * @returns Updated user profile
   */
  async updateProfile(
    userId: string,
    updateData: UpdateProfileDtoType
  ): Promise<Omit<User, 'password'>> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    return this.userRepository.updateProfile(userId, updateData);
  }

  /**
   * Get all users (for task assignment)
   * @returns List of all users
   */
  async getAllUsers(): Promise<Omit<User, 'password'>[]> {
    return this.userRepository.findAll();
  }
}