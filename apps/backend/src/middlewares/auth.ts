import { Request, Response, NextFunction } from 'express';
import { verifyAccessToken } from '../utils/jwt';
import User from '../models/User';

export interface AuthRequest extends Request {
  user?: {
    userId: string;
    role: string;
  };
}

export const authenticate = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '') || req.cookies?.accessToken;

    if (!token) {
      res.status(401).json({ message: 'لطفاً وارد شوید' });
      return;
    }

    const decoded = verifyAccessToken(token);

    // بررسی وجود کاربر
    const user = await User.findById(decoded.userId);
    if (!user || !user.isActive) {
      res.status(401).json({ message: 'کاربر یافت نشد یا غیرفعال است' });
      return;
    }

    req.user = {
      userId: decoded.userId,
      role: decoded.role,
    };

    next();
  } catch (error) {
    res.status(401).json({ message: 'توکن نامعتبر است' });
  }
};

export const authorize = (...roles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({ message: 'لطفاً وارد شوید' });
      return;
    }

    if (!roles.includes(req.user.role)) {
      res.status(403).json({ message: 'شما دسترسی لازم را ندارید' });
      return;
    }

    next();
  };
};
