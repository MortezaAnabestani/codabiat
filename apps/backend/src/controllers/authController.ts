import { Response } from 'express';
import { AuthRequest } from '../middlewares/auth';
import User from '../models/User';
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from '../utils/jwt';

export const register = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { name, email, password } = req.body;

    // بررسی وجود کاربر
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: 'این ایمیل قبلاً ثبت شده است' });
      return;
    }

    // ایجاد کاربر جدید
    const user = await User.create({
      name,
      email,
      password,
      role: 'user',
    });

    // تولید توکن‌ها
    const accessToken = generateAccessToken({ userId: user._id.toString(), role: user.role });
    const refreshToken = generateRefreshToken({ userId: user._id.toString(), role: user.role });

    // ذخیره refresh token
    user.refreshToken = refreshToken;
    await user.save();

    // تنظیم cookie
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 روز
    });

    res.status(201).json({
      success: true,
      message: 'ثبت‌نام با موفقیت انجام شد',
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        accessToken,
      },
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    // یافتن کاربر (با انتخاب فیلد password)
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      res.status(401).json({ message: 'ایمیل یا رمز عبور اشتباه است' });
      return;
    }

    // بررسی فعال بودن کاربر
    if (!user.isActive) {
      res.status(401).json({ message: 'حساب کاربری شما غیرفعال است' });
      return;
    }

    // بررسی رمز عبور
    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
      res.status(401).json({ message: 'ایمیل یا رمز عبور اشتباه است' });
      return;
    }

    // تولید توکن‌ها
    const accessToken = generateAccessToken({ userId: user._id.toString(), role: user.role });
    const refreshToken = generateRefreshToken({ userId: user._id.toString(), role: user.role });

    // ذخیره refresh token
    user.refreshToken = refreshToken;
    await user.save();

    // تنظیم cookie
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 روز
    });

    res.status(200).json({
      success: true,
      message: 'ورود موفقیت‌آمیز',
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        accessToken,
      },
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const refreshToken = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
      res.status(401).json({ message: 'توکن یافت نشد' });
      return;
    }

    // اعتبارسنجی refresh token
    const decoded = verifyRefreshToken(refreshToken);

    // یافتن کاربر
    const user = await User.findById(decoded.userId).select('+refreshToken');
    if (!user || user.refreshToken !== refreshToken) {
      res.status(401).json({ message: 'توکن نامعتبر است' });
      return;
    }

    // تولید access token جدید
    const newAccessToken = generateAccessToken({ userId: user._id.toString(), role: user.role });

    res.status(200).json({
      success: true,
      data: {
        accessToken: newAccessToken,
      },
    });
  } catch (error: any) {
    res.status(401).json({ message: 'توکن نامعتبر است' });
  }
};

export const logout = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (req.user) {
      // حذف refresh token از دیتابیس
      await User.findByIdAndUpdate(req.user.userId, { refreshToken: null });
    }

    // حذف cookie
    res.clearCookie('refreshToken');

    res.status(200).json({
      success: true,
      message: 'خروج موفقیت‌آمیز',
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getMe = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const user = await User.findById(req.user?.userId);

    if (!user) {
      res.status(404).json({ message: 'کاربر یافت نشد' });
      return;
    }

    res.status(200).json({
      success: true,
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          avatar: user.avatar,
          bio: user.bio,
        },
      },
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
