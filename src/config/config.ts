// config.ts
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(
      process.env.MONGO_URI as string,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      } as mongoose.ConnectOptions
    );
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

export default connectDB;
