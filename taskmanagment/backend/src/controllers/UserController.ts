import { Request, Response, NextFunction } from 'express';
import { UserService } from '../services/UserService';
import { UpdateProfileDtoType } from '../dto/user.dto';
import { AuthenticatedRequest } from '../middleware/auth';

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  getAllUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const users = await this.userService.getAllUsers();
      res.json({ users });
    } catch (error) {
      next(error);
    }
  };

  updateProfile = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const profileData: UpdateProfileDtoType = req.body;
      const user = await this.userService.updateProfile(req.userId!, profileData);

      res.json({
        message: 'Profile updated successfully',
        user
      });
    } catch (error) {
      next(error);
    }
  };
}