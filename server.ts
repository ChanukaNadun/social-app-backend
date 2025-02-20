//server.ts
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./src/config/config";
import userRoutes from "./src/routers/userRoutes";
import postRoutes from "./src/routers/postRoutes";
import cardRoutes from "./src/routers/cardRoutes";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
connectDB();

// Routes
app.use("/api", userRoutes);
app.use("/api", postRoutes);
app.use("/api", cardRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
