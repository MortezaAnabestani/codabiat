import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
  avatar?: string;
  bio?: string;
  isActive: boolean;
  refreshToken?: string;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, 'نام الزامی است'],
      trim: true,
      maxlength: [50, 'نام نمی‌تواند بیشتر از 50 کاراکتر باشد'],
    },
    email: {
      type: String,
      required: [true, 'ایمیل الزامی است'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'لطفاً یک ایمیل معتبر وارد کنید'],
    },
    password: {
      type: String,
      required: [true, 'رمز عبور الزامی است'],
      minlength: [6, 'رمز عبور باید حداقل 6 کاراکتر باشد'],
      select: false,
    },
    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user',
    },
    avatar: {
      type: String,
    },
    bio: {
      type: String,
      maxlength: [500, 'بیوگرافی نمی‌تواند بیشتر از 500 کاراکتر باشد'],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    refreshToken: {
      type: String,
      select: false,
    },
  },
  {
    timestamps: true,
  }
);

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare password method
userSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return await bcrypt.compare(candidatePassword, this.password);
};

export default model<IUser>('User', userSchema);
