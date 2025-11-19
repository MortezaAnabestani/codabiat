import { Schema, model, Document } from 'mongoose';
import slugify from 'slugify';

export interface ICategory extends Document {
  name: string;
  slug: string;
  description?: string;
  parent?: Schema.Types.ObjectId;
  type: 'programming' | 'electronic-literature';
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const categorySchema = new Schema<ICategory>(
  {
    name: {
      type: String,
      required: [true, 'نام دسته‌بندی الزامی است'],
      trim: true,
      maxlength: [100, 'نام دسته‌بندی نمی‌تواند بیشتر از 100 کاراکتر باشد'],
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
    },
    description: {
      type: String,
      maxlength: [500, 'توضیحات نمی‌تواند بیشتر از 500 کاراکتر باشد'],
    },
    parent: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      default: null,
    },
    type: {
      type: String,
      enum: ['programming', 'electronic-literature'],
      required: true,
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

// Generate slug before saving
categorySchema.pre('save', function (next) {
  if (this.isModified('name')) {
    this.slug = slugify(this.name, { lower: true, strict: true });
  }
  next();
});

export default model<ICategory>('Category', categorySchema);
