import mongoose from 'mongoose';

export const setupDatabase = () => {
  mongoose.connect(process.env.MONGO_DB_URL || '', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};
