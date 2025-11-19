import { Schema, model, Document } from 'mongoose';

export interface IComment extends Document {
  content: string;
  author: Schema.Types.ObjectId;
  targetType: 'course' | 'lesson' | 'article';
  targetId: Schema.Types.ObjectId;
  parent?: Schema.Types.ObjectId; // برای پاسخ‌ها
  isApproved: boolean;
  likes: Schema.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const commentSchema = new Schema<IComment>(
  {
    content: {
      type: String,
      required: [true, 'محتوای نظر الزامی است'],
      trim: true,
      maxlength: [1000, 'نظر نمی‌تواند بیشتر از 1000 کاراکتر باشد'],
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    targetType: {
      type: String,
      enum: ['course', 'lesson', 'article'],
      required: true,
    },
    targetId: {
      type: Schema.Types.ObjectId,
      required: true,
      refPath: 'targetType',
    },
    parent: {
      type: Schema.Types.ObjectId,
      ref: 'Comment',
      default: null,
    },
    isApproved: {
      type: Boolean,
      default: false, // نیاز به تایید ادمین
    },
    likes: [{
      type: Schema.Types.ObjectId,
      ref: 'User',
    }],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual for replies
commentSchema.virtual('replies', {
  ref: 'Comment',
  localField: '_id',
  foreignField: 'parent',
});

// Index for efficient querying
commentSchema.index({ targetType: 1, targetId: 1, createdAt: -1 });
commentSchema.index({ parent: 1 });

export default model<IComment>('Comment', commentSchema);
