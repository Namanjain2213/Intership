import { Request, Response, NextFunction } from 'express';
import { authenticateToken } from '../auth.middleware';
import { generateAccessToken } from '../../utils/jwt';
import { mockPrisma } from '../../test/setup';

describe('Auth Middleware', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    req = {
      headers: {},
      cookies: {},
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  it('should authenticate valid token from Authorization header', async () => {
    const mockUser = {
      id: 'user-1',
      email: 'test@example.com',
      name: 'Test User',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const token = generateAccessToken({
      userId: mockUser.id,
      email: mockUser.email,
    });

    req.headers = {
      authorization: `Bearer ${token}`,
    };

    mockPrisma.user.findUnique.mockResolvedValue(mockUser);

    await authenticateToken(req as any, res as Response, next);

    expect(req.user).toEqual(mockUser);
    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
  });

  it('should authenticate valid token from cookies', async () => {
    const mockUser = {
      id: 'user-1',
      email: 'test@example.com',
      name: 'Test User',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const token = generateAccessToken({
      userId: mockUser.id,
      email: mockUser.email,
    });

    req.cookies = {
      accessToken: token,
    };

    mockPrisma.user.findUnique.mockResolvedValue(mockUser);

    await authenticateToken(req as any, res as Response, next);

    expect(req.user).toEqual(mockUser);
    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
  });

  it('should reject request without token', async () => {
    await authenticateToken(req as any, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: 'Access token required' });
    expect(next).not.toHaveBeenCalled();
  });

  it('should reject invalid token', async () => {
    req.headers = {
      authorization: 'Bearer invalid-token',
    };

    await authenticateToken(req as any, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: 'Invalid token' });
    expect(next).not.toHaveBeenCalled();
  });

  it('should reject token for non-existent user', async () => {
    const token = generateAccessToken({
      userId: 'non-existent-user',
      email: 'test@example.com',
    });

    req.headers = {
      authorization: `Bearer ${token}`,
    };

    mockPrisma.user.findUnique.mockResolvedValue(null);

    await authenticateToken(req as any, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: 'User not found' });
    expect(next).not.toHaveBeenCalled();
  });
});