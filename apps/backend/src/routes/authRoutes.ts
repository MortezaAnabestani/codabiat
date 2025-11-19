import { Router } from 'express';
import { body } from 'express-validator';
import { register, login, refreshToken, logout, getMe } from '../controllers/authController';
import { authenticate } from '../middlewares/auth';
import { validate } from '../middlewares/validator';

const router = Router();

router.post(
  '/register',
  [
    body('name').trim().notEmpty().withMessage('نام الزامی است'),
    body('email').isEmail().withMessage('ایمیل معتبر نیست'),
    body('password').isLength({ min: 6 }).withMessage('رمز عبور باید حداقل 6 کاراکتر باشد'),
    validate,
  ],
  register
);

router.post(
  '/login',
  [
    body('email').isEmail().withMessage('ایمیل معتبر نیست'),
    body('password').notEmpty().withMessage('رمز عبور الزامی است'),
    validate,
  ],
  login
);

router.post('/refresh', refreshToken);

router.post('/logout', authenticate, logout);

router.get('/me', authenticate, getMe);

export default router;
