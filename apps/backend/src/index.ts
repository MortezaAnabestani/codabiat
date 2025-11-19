import express, { Application } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import connectDB from './config/database';
import routes from './routes';
import { errorHandler, notFound } from './middlewares/errorHandler';

// تنظیم متغیرهای محیطی
dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 5000;

// اتصال به دیتابیس
connectDB();

// Middlewares امنیتی
app.use(helmet());

// CORS Configuration
const corsOptions = {
  origin: process.env.CORS_ORIGIN?.split(',') || ['http://localhost:3000', 'http://localhost:5173'],
  credentials: true,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// Rate Limiting
const limiter = rateLimit({
  windowMs: Number(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 دقیقه
  max: Number(process.env.RATE_LIMIT_MAX_REQUESTS) || 100,
  message: 'درخواست‌های زیادی از این IP ارسال شده، لطفاً بعداً تلاش کنید',
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api/', limiter);

// Body Parser
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Cookie Parser
app.use(cookieParser());

// Compression
app.use(compression());

// Logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

// Routes
app.use('/api', routes);

// Root route
app.get('/', (req, res) => {
  res.json({
    message: 'به API پلتفرم کدبیات خوش آمدید 🚀',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      auth: '/api/auth',
      courses: '/api/courses',
    },
  });
});

// Error Handlers
app.use(notFound);
app.use(errorHandler);

// Start Server
app.listen(PORT, () => {
  console.log(`
  ╔═══════════════════════════════════════╗
  ║   🚀 سرور کدبیات راه‌اندازی شد      ║
  ║                                       ║
  ║   محیط: ${process.env.NODE_ENV || 'development'}                   ║
  ║   پورت: ${PORT}                        ║
  ║   آدرس: http://localhost:${PORT}      ║
  ╚═══════════════════════════════════════╝
  `);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err: Error) => {
  console.error('❌ Unhandled Rejection:', err.message);
  process.exit(1);
});
