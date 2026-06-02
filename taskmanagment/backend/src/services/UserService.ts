import { UserRepository } from '../repositories/UserRepository';
import { UpdateProfileDtoType } from '../dto/user.dto';
import { IUser } from '../models/User';

export class UserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async getAllUsers(): Promise<IUser[]> {
    return await this.userRepository.findAll();
  }

  async getUserById(userId: string): Promise<IUser | null> {
    return await this.userRepository.findById(userId);
  }

  async updateProfile(userId: string, profileData: UpdateProfileDtoType): Promise<IUser> {
    // Check if email is being updated and if it's already taken
    if (profileData.email) {
      const existingUser = await this.userRepository.findByEmail(profileData.email);
      if (existingUser && existingUser._id !== userId) {
        throw new Error('Email is already taken');
      }
    }

    const updatedUser = await this.userRepository.update(userId, profileData);
    if (!updatedUser) {
      throw new Error('User not found');
    }

    return updatedUser;
  }
}