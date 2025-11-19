import { Schema, model, Document } from 'mongoose';
import slugify from 'slugify';

export interface IArticle extends Document {
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  coverImage?: string;
  author: Schema.Types.ObjectId;
  category: Schema.Types.ObjectId;
  tags: string[];
  isPublished: boolean;
  publishedAt?: Date;
  metadata: {
    views: number;
    readTime: number; // به دقیقه
  };
  seoMetadata: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
  };
  createdAt: Date;
  updatedAt: Date;
}

const articleSchema = new Schema<IArticle>(
  {
    title: {
      type: String,
      required: [true, 'عنوان مقاله الزامی است'],
      trim: true,
      maxlength: [200, 'عنوان نمی‌تواند بیشتر از 200 کاراکتر باشد'],
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
    },
    content: {
      type: String,
      required: [true, 'محتوای مقاله الزامی است'],
    },
    excerpt: {
      type: String,
      required: [true, 'خلاصه مقاله الزامی است'],
      maxlength: [500, 'خلاصه نمی‌تواند بیشتر از 500 کاراکتر باشد'],
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
    isPublished: {
      type: Boolean,
      default: false,
    },
    publishedAt: {
      type: Date,
    },
    metadata: {
      views: {
        type: Number,
        default: 0,
      },
      readTime: {
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
  }
);

// Generate slug before saving
articleSchema.pre('save', function (next) {
  if (this.isModified('title')) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }

  // Set publishedAt when first published
  if (this.isModified('isPublished') && this.isPublished && !this.publishedAt) {
    this.publishedAt = new Date();
  }

  next();
});

export default model<IArticle>('Article', articleSchema);
