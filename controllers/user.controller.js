import { UserModel } from "../models/userModel.js";
import jwt from "jsonwebtoken";
import {
  getUserFromCache,
  updateUserInCache,
} from "../cache/userCache.js";

// 🔑 Generate JWT Token
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });
};

// ✅ Register New User
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already registered" });
    }

    const newUser = await UserModel.create({ name, email, password });

    const token = generateToken(newUser._id);

    const userPayload = {
      id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
    };

    // ✅ Cache user after creation
    updateUserInCache(newUser._id.toString(), userPayload);

    return res.status(201).json({
      message: "Registration successful",
      user: userPayload,
      token,
    });
  } catch (err) {
    console.error("Register Error:", err);
    return res.status(500).json({ message: "Server Error" });
  }
};

// ✅ Login User
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await UserModel.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user._id);

    const userPayload = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    // ✅ Update cache
    updateUserInCache(user._id.toString(), userPayload);

    return res.status(200).json({
      message: "Login successful",
      user: userPayload,
      token,
    });
  } catch (err) {
    console.error("Login Error:", err);
    return res.status(500).json({ message: "Server Error" });
  }
};

// ✅ Get User Profile (Protected Route)
const getUserProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    // ✅ Fetch from cache center
    const user = await getUserFromCache(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      message: "User profile fetched successfully",
      user,
    });
  } catch (err) {
    console.error("Profile Error:", err);
    return res.status(500).json({ message: "Server Error" });
  }
};

const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, email, password } = req.body;

    // Find user in DB
    const user = await UserModel.findById(userId).select("+password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update fields if provided
    if (name) user.name = name;
    if (email) user.email = email;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    // Save updated user
    const updatedUser = await user.save();

    const userPayload = {
      id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
    };

    // ✅ Update user in cache
    updateUserInCache(userId, userPayload);

    return res.status(200).json({
      message: "Profile updated successfully",
      user: userPayload,
    });
  } catch (err) {
    console.error("Update Profile Error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

export {
  registerUser,
  loginUser,
  getUserProfile,
  updateProfile
};
