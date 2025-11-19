// User Types
export interface IUser {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  avatar?: string;
  bio?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IAuthResponse {
  success: boolean;
  message: string;
  data: {
    user: IUser;
    accessToken: string;
  };
}

// Category Types
export interface ICategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  parent?: string;
  type: 'programming' | 'electronic-literature';
  isActive: boolean;
}

// Course Types
export interface ICourse {
  id: string;
  title: string;
  slug: string;
  description: string;
  coverImage?: string;
  author: IUser | string;
  category: ICategory | string;
  tags: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  type: 'programming' | 'electronic-literature';
  isPublished: boolean;
  isFree: boolean;
  price?: number;
  freeChaptersCount: number;
  estimatedDuration?: number;
  metadata: {
    views: number;
    enrollments: number;
    rating: number;
    reviewsCount: number;
  };
  seoMetadata?: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
  };
  createdAt: Date;
  updatedAt: Date;
}

// Lesson Types
export interface ICodeBlock {
  language: 'javascript' | 'typescript' | 'react' | 'nodejs';
  code: string;
  isEditable: boolean;
  showOutput: boolean;
}

export interface INote {
  type: 'info' | 'warning' | 'tip' | 'important';
  title?: string;
  content: string;
  position: number;
}

export interface ILesson {
  id: string;
  course: ICourse | string;
  title: string;
  slug: string;
  content: string;
  codeBlocks: ICodeBlock[];
  notes: INote[];
  order: number;
  duration?: number;
  isFree: boolean;
  isPublished: boolean;
  seoMetadata?: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
  };
  createdAt: Date;
  updatedAt: Date;
}

// Article Types
export interface IArticle {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  coverImage?: string;
  author: IUser | string;
  category: ICategory | string;
  tags: string[];
  isPublished: boolean;
  publishedAt?: Date;
  metadata: {
    views: number;
    readTime: number;
  };
  seoMetadata?: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
  };
  createdAt: Date;
  updatedAt: Date;
}

// Comment Types
export interface IComment {
  id: string;
  content: string;
  author: IUser | string;
  targetType: 'course' | 'lesson' | 'article';
  targetId: string;
  parent?: string;
  isApproved: boolean;
  likes: string[];
  createdAt: Date;
  updatedAt: Date;
}

// Quiz Types
export interface IQuizQuestion {
  question: string;
  type: 'single-choice' | 'multiple-choice' | 'true-false' | 'code';
  options?: string[];
  correctAnswer: string | string[];
  explanation?: string;
  codeSnippet?: string;
}

export interface IQuiz {
  id: string;
  lesson: ILesson | string;
  title: string;
  description?: string;
  questions: IQuizQuestion[];
  passingScore: number;
  timeLimit?: number;
  order: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Progress Types
export interface IQuizAttempt {
  quiz: string;
  score: number;
  answers: {
    questionIndex: number;
    answer: string | string[];
  }[];
  completedAt: Date;
  passed: boolean;
}

export interface IProgress {
  id: string;
  user: string;
  course: string;
  completedLessons: string[];
  quizAttempts: IQuizAttempt[];
  lastAccessedLesson?: string;
  enrolledAt: Date;
  completionPercentage: number;
  totalTimeSpent: number;
  createdAt: Date;
  updatedAt: Date;
}

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
}

export interface PaginatedResponse<T = any> {
  success: boolean;
  data: {
    items: T[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      pages: number;
    };
  };
}
