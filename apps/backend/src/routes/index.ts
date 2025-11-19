import { Router } from 'express';
import authRoutes from './authRoutes';
import courseRoutes from './courseRoutes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/courses', courseRoutes);

// Health check
router.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'سرور فعال است' });
});

export default router;
