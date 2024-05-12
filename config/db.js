const uri = "mongodb+srv://guide2code:1234@cluster0.2c5pbw1.mongodb.net/db?retryWrites=true&w=majority&appName=Cluster0";
import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect(uri);
    console.log('Mongo connected');
  } catch (error) {
    console.log('Error mongo');
    console.log(error);
  }
};
export default connectDB;