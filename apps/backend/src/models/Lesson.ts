import { Schema, model, Document } from 'mongoose';
import slugify from 'slugify';

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
  position: number; // موقعیت در محتوا
}

export interface ILesson extends Document {
  course: Schema.Types.ObjectId;
  title: string;
  slug: string;
  content: string; // HTML content from TinyMCE
  codeBlocks: ICodeBlock[];
  notes: INote[];
  order: number;
  duration?: number; // به دقیقه
  isFree: boolean;
  isPublished: boolean;
  seoMetadata: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
  };
  createdAt: Date;
  updatedAt: Date;
}

const lessonSchema = new Schema<ILesson>(
  {
    course: {
      type: Schema.Types.ObjectId,
      ref: 'Course',
      required: true,
    },
    title: {
      type: String,
      required: [true, 'عنوان درس الزامی است'],
      trim: true,
      maxlength: [200, 'عنوان نمی‌تواند بیشتر از 200 کاراکتر باشد'],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    content: {
      type: String,
      required: [true, 'محتوای درس الزامی است'],
    },
    codeBlocks: [{
      language: {
        type: String,
        enum: ['javascript', 'typescript', 'react', 'nodejs'],
        required: true,
      },
      code: {
        type: String,
        required: true,
      },
      isEditable: {
        type: Boolean,
        default: true,
      },
      showOutput: {
        type: Boolean,
        default: true,
      },
    }],
    notes: [{
      type: {
        type: String,
        enum: ['info', 'warning', 'tip', 'important'],
        required: true,
      },
      title: String,
      content: {
        type: String,
        required: true,
      },
      position: {
        type: Number,
        required: true,
      },
    }],
    order: {
      type: Number,
      required: true,
      default: 0,
    },
    duration: {
      type: Number, // به دقیقه
    },
    isFree: {
      type: Boolean,
      default: false,
    },
    isPublished: {
      type: Boolean,
      default: false,
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
lessonSchema.pre('save', function (next) {
  if (this.isModified('title')) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});

// Index for efficient querying
lessonSchema.index({ course: 1, order: 1 });
lessonSchema.index({ slug: 1 });

export default model<ILesson>('Lesson', lessonSchema);
