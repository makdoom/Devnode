import mongoose from "mongoose";
import { DB_NAME } from "../constant";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGO_URI}/${DB_NAME}`
    );
    console.log(
      `\n✅ MongoDB connected successfully at ${connectionInstance.connection.host} 🚀`
    );
  } catch (error) {
    console.log(`❌ MongoDB Connection error: ${error}`);
    process.exit(1);
  }
};

export default connectDB;
