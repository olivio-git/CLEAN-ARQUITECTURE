import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const DATABASE = process.env.DATABASE_URL as string;

const mongoConnect = async () => {
  try {
    if(!DATABASE) throw new Error("Database URL is not provided");
    return await mongoose.connect(DATABASE); 
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};
export default mongoConnect;