import { Schema, model, Document } from 'mongoose';
import slugify from 'slugify';

export interface ICourse extends Document {
  title: string;
  slug: string;
  description: string;
  coverImage?: string;
  author: Schema.Types.ObjectId;
  category: Schema.Types.ObjectId;
  tags: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  type: 'programming' | 'electronic-literature';
  isPublished: boolean;
  isFree: boolean;
  price?: number;
  freeChaptersCount: number; // تعداد فصل‌های رایگان
  estimatedDuration?: number; // به دقیقه
  metadata: {
    views: number;
    enrollments: number;
    rating: number;
    reviewsCount: number;
  };
  seoMetadata: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
  };
  createdAt: Date;
  updatedAt: Date;
}

const courseSchema = new Schema<ICourse>(
  {
    title: {
      type: String,
      required: [true, 'عنوان آموزش الزامی است'],
      trim: true,
      maxlength: [200, 'عنوان نمی‌تواند بیشتر از 200 کاراکتر باشد'],
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: [true, 'توضیحات الزامی است'],
      maxlength: [2000, 'توضیحات نمی‌تواند بیشتر از 2000 کاراکتر باشد'],
    },
    coverImage: {
      type: String,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    tags: [{
      type: String,
      trim: true,
    }],
    difficulty: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      default: 'beginner',
    },
    type: {
      type: String,
      enum: ['programming', 'electronic-literature'],
      required: true,
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
    isFree: {
      type: Boolean,
      default: true,
    },
    price: {
      type: Number,
      default: 0,
    },
    freeChaptersCount: {
      type: Number,
      default: 3, // 3 فصل اول رایگان
    },
    estimatedDuration: {
      type: Number, // به دقیقه
    },
    metadata: {
      views: {
        type: Number,
        default: 0,
      },
      enrollments: {
        type: Number,
        default: 0,
      },
      rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5,
      },
      reviewsCount: {
        type: Number,
        default: 0,
      },
    },
    seoMetadata: {
      metaTitle: String,
      metaDescription: String,
      keywords: [String],
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Generate slug before saving
courseSchema.pre('save', function (next) {
  if (this.isModified('title')) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});

// Virtual for lessons
courseSchema.virtual('lessons', {
  ref: 'Lesson',
  localField: '_id',
  foreignField: 'course',
  options: { sort: { order: 1 } },
});

export default model<ICourse>('Course', courseSchema);
