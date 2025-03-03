import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({
    path: "../config.env",
});
const DB_url = `mongodb+srv://ramireddy:ramireddy@cluster0.7jmdq.mongodb.net`
const connectDB = async () => {
  try {
    await mongoose.connect(`${DB_url}/livelocation` as string);
    console.log(" MongoDB Connected");
  } catch (error) {
    console.error(" MongoDB Connection Error:", error);
    process.exit(1);
  }
};

export default connectDB;
