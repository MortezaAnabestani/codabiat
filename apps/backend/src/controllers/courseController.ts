import { Response } from 'express';
import { AuthRequest } from '../middlewares/auth';
import Course from '../models/Course';
import Lesson from '../models/Lesson';
import Progress from '../models/Progress';

export const getAllCourses = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { type, category, difficulty, search, page = 1, limit = 10 } = req.query;

    const query: any = { isPublished: true };

    // فیلترها
    if (type) query.type = type;
    if (category) query.category = category;
    if (difficulty) query.difficulty = difficulty;
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search as string, 'i')] } },
      ];
    }

    const skip = (Number(page) - 1) * Number(limit);

    const courses = await Course.find(query)
      .populate('author', 'name avatar')
      .populate('category', 'name slug')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    const total = await Course.countDocuments(query);

    res.status(200).json({
      success: true,
      data: {
        courses,
        pagination: {
          page: Number(page),
          limit: Number(limit),
          total,
          pages: Math.ceil(total / Number(limit)),
        },
      },
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getCourseBySlug = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { slug } = req.params;

    const course = await Course.findOne({ slug, isPublished: true })
      .populate('author', 'name avatar bio')
      .populate('category', 'name slug');

    if (!course) {
      res.status(404).json({ message: 'آموزش یافت نشد' });
      return;
    }

    // افزایش تعداد بازدید
    course.metadata.views += 1;
    await course.save();

    // دریافت درس‌ها
    const lessons = await Lesson.find({ course: course._id, isPublished: true })
      .sort({ order: 1 })
      .select('title slug order duration isFree');

    // بررسی دسترسی کاربر
    let userProgress = null;
    if (req.user) {
      userProgress = await Progress.findOne({
        user: req.user.userId,
        course: course._id,
      });

      // اگر کاربر ثبت نام نکرده، ثبت نام خودکار
      if (!userProgress) {
        userProgress = await Progress.create({
          user: req.user.userId,
          course: course._id,
        });

        course.metadata.enrollments += 1;
        await course.save();
      }
    }

    res.status(200).json({
      success: true,
      data: {
        course,
        lessons,
        userProgress,
      },
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const createCourse = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const courseData = {
      ...req.body,
      author: req.user?.userId,
    };

    const course = await Course.create(courseData);

    res.status(201).json({
      success: true,
      message: 'آموزش با موفقیت ایجاد شد',
      data: { course },
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updateCourse = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const course = await Course.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!course) {
      res.status(404).json({ message: 'آموزش یافت نشد' });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'آموزش با موفقیت به‌روزرسانی شد',
      data: { course },
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteCourse = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const course = await Course.findByIdAndDelete(id);

    if (!course) {
      res.status(404).json({ message: 'آموزش یافت نشد' });
      return;
    }

    // حذف درس‌های مرتبط
    await Lesson.deleteMany({ course: id });

    res.status(200).json({
      success: true,
      message: 'آموزش با موفقیت حذف شد',
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
