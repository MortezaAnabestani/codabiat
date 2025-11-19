import { Schema, model, Document } from 'mongoose';

export interface IQuizQuestion {
  question: string;
  type: 'single-choice' | 'multiple-choice' | 'true-false' | 'code';
  options?: string[];
  correctAnswer: string | string[]; // برای multiple-choice می‌تواند آرایه باشد
  explanation?: string;
  codeSnippet?: string; // برای سوالات کد
}

export interface IQuiz extends Document {
  lesson: Schema.Types.ObjectId;
  title: string;
  description?: string;
  questions: IQuizQuestion[];
  passingScore: number; // درصد
  timeLimit?: number; // به دقیقه
  order: number; // موقعیت در درس
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const quizSchema = new Schema<IQuiz>(
  {
    lesson: {
      type: Schema.Types.ObjectId,
      ref: 'Lesson',
      required: true,
    },
    title: {
      type: String,
      required: [true, 'عنوان آزمون الزامی است'],
      trim: true,
      maxlength: [200, 'عنوان نمی‌تواند بیشتر از 200 کاراکتر باشد'],
    },
    description: {
      type: String,
      maxlength: [500, 'توضیحات نمی‌تواند بیشتر از 500 کاراکتر باشد'],
    },
    questions: [{
      question: {
        type: String,
        required: true,
      },
      type: {
        type: String,
        enum: ['single-choice', 'multiple-choice', 'true-false', 'code'],
        required: true,
      },
      options: [String],
      correctAnswer: Schema.Types.Mixed, // می‌تواند string یا array باشد
      explanation: String,
      codeSnippet: String,
    }],
    passingScore: {
      type: Number,
      default: 70,
      min: 0,
      max: 100,
    },
    timeLimit: {
      type: Number, // به دقیقه
    },
    order: {
      type: Number,
      required: true,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Index for efficient querying
quizSchema.index({ lesson: 1, order: 1 });

export default model<IQuiz>('Quiz', quizSchema);
