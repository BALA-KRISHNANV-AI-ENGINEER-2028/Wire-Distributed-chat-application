import mongoose from 'mongoose';

export const connectDatabase = async (mongoUri, logger) => {
  try {
    await mongoose.connect(mongoUri);
    logger.info('MongoDB connected');
  } catch (error) {
    logger.error('MongoDB connection failed', { error: error.message });
    throw error;
  }
};
