import { Router } from 'express';
import { body } from 'express-validator';
import {
  getAllCourses,
  getCourseBySlug,
  createCourse,
  updateCourse,
  deleteCourse,
} from '../controllers/courseController';
import { authenticate, authorize } from '../middlewares/auth';
import { validate } from '../middlewares/validator';

const router = Router();

// مسیرهای عمومی
router.get('/', getAllCourses);
router.get('/:slug', getCourseBySlug);

// مسیرهای ادمین
router.post(
  '/',
  authenticate,
  authorize('admin'),
  [
    body('title').trim().notEmpty().withMessage('عنوان الزامی است'),
    body('description').trim().notEmpty().withMessage('توضیحات الزامی است'),
    body('category').notEmpty().withMessage('دسته‌بندی الزامی است'),
    body('type').isIn(['programming', 'electronic-literature']).withMessage('نوع آموزش نامعتبر است'),
    validate,
  ],
  createCourse
);

router.put('/:id', authenticate, authorize('admin'), updateCourse);

router.delete('/:id', authenticate, authorize('admin'), deleteCourse);

export default router;
