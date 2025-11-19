import { Schema, model, Document } from 'mongoose';

export interface IQuizAttempt {
  quiz: Schema.Types.ObjectId;
  score: number;
  answers: {
    questionIndex: number;
    answer: string | string[];
  }[];
  completedAt: Date;
  passed: boolean;
}

export interface IProgress extends Document {
  user: Schema.Types.ObjectId;
  course: Schema.Types.ObjectId;
  completedLessons: Schema.Types.ObjectId[];
  quizAttempts: IQuizAttempt[];
  lastAccessedLesson?: Schema.Types.ObjectId;
  enrolledAt: Date;
  completionPercentage: number;
  totalTimeSpent: number; // به دقیقه
  createdAt: Date;
  updatedAt: Date;
}

const progressSchema = new Schema<IProgress>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    course: {
      type: Schema.Types.ObjectId,
      ref: 'Course',
      required: true,
    },
    completedLessons: [{
      type: Schema.Types.ObjectId,
      ref: 'Lesson',
    }],
    quizAttempts: [{
      quiz: {
        type: Schema.Types.ObjectId,
        ref: 'Quiz',
        required: true,
      },
      score: {
        type: Number,
        required: true,
        min: 0,
        max: 100,
      },
      answers: [{
        questionIndex: Number,
        answer: Schema.Types.Mixed,
      }],
      completedAt: {
        type: Date,
        default: Date.now,
      },
      passed: {
        type: Boolean,
        required: true,
      },
    }],
    lastAccessedLesson: {
      type: Schema.Types.ObjectId,
      ref: 'Lesson',
    },
    enrolledAt: {
      type: Date,
      default: Date.now,
    },
    completionPercentage: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    totalTimeSpent: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Compound index for unique user-course combination
progressSchema.index({ user: 1, course: 1 }, { unique: true });

export default model<IProgress>('Progress', progressSchema);
