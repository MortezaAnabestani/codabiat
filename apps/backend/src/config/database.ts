import mongoose from 'mongoose';

const connectDB = async (): Promise<void> => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/codabiat';

    await mongoose.connect(mongoURI);

    console.log('✅ MongoDB متصل شد');

    mongoose.connection.on('error', (err) => {
      console.error('❌ خطا در اتصال MongoDB:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('⚠️  MongoDB قطع شد');
    });

  } catch (error) {
    console.error('❌ خطا در اتصال به MongoDB:', error);
    process.exit(1);
  }
};

export default connectDB;
