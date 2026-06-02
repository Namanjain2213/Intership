import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/AuthService';
import { RegisterDtoType, LoginDtoType } from '../dto/auth.dto';
import { AuthenticatedRequest } from '../middleware/auth';

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userData: RegisterDtoType = req.body;
      const { user, token } = await this.authService.register(userData);

      // Set HTTP-only cookie
      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
      });

      res.status(201).json({
        message: 'User registered successfully',
        user,
        token
      });
    } catch (error) {
      next(error);
    }
  };

  login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const loginData: LoginDtoType = req.body;
      const { user, token } = await this.authService.login(loginData);

      // Set HTTP-only cookie
      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
      });

      res.json({
        message: 'Login successful',
        user,
        token
      });
    } catch (error) {
      next(error);
    }
  };

  logout = async (req: Request, res: Response): Promise<void> => {
    res.clearCookie('token');
    res.json({ message: 'Logout successful' });
  };

  me = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const user = await this.authService.getUserById(req.userId!);
      if (!user) {
        res.status(404).json({ error: 'User not found' });
        return;
      }

      res.json({ user });
    } catch (error) {
      next(error);
    }
  };
}