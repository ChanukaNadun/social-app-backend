//userRoutes.ts
import express, { RequestHandler } from "express";
import User from "../model/userModels";
import protect from "../middleware/authMiddleware";
import bcrypt from "bcryptjs";
const jwt = require("jsonwebtoken");
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

router.post("/users/register", (async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create new user
    const newUser = new User({ name, email, password });
    await newUser.save();

    // Generate token
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET!, {
      expiresIn: "30d",
    });

    res.status(201).json({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      token,
    });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
}) as RequestHandler);

// Login User
router.post("/users/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    // Check if user exists and password is correct
    if (user && (await user.matchPassword(password))) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, {
        expiresIn: "30d",
      });

      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token,
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
});



// Get All Users (Protected)
router.get("/users", protect, async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
});

// Get Single User by ID (Protected)
router.get("/users/:id", protect, (async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
}) as RequestHandler);

// Update User Name & Password (Protected)
router.put("/users/:id", protect, (async (req, res) => {
  try {
    const { name, password } = req.body;
    const user = await User.findById(req.params.id);

    if (!user) return res.status(404).json({ message: "User not found" });

    if (name) user.name = name;
    if (password) user.password = password; // New password will be hashed in the model

    await user.save();
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
}) as RequestHandler);

// Delete User (Protected)
router.delete("/users/:id", protect, (async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
}) as RequestHandler);

export default router;
