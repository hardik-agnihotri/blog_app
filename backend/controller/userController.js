import { generateToken } from "../middleware/authMiddleware.js";
import User from "../model/userModel.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const existingUser = await User.findOne({ email }).select("+password");

    if (!existingUser) {
      return res.status(401).json({
        success: false,
        message: "User not exists",
      });
    }

    const isVerified = await bcrypt.compare(password, existingUser.password);
    if (!isVerified) {
      return res.status(401).json({
        success: false,
        message: "Please check the credentials",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User Logged in Successfully",
      data: {
        username: existingUser.username,
        email,
        token: generateToken(existingUser._id),
      },
    });
  } catch (error) {
    console.error("Error logging user", error);
    return res.status(400).json({
      success: false,
      message: "User Failed to be login server error",
    });
  }
};

export const myinfo = async (req, res) => {
  try {
    const user = req.user;
    const userDetails = await User.findById(user._id);
    if (!userDetails) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      user: userDetails,
    });
  } catch (error) {
    console.error("MYINFO ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const goGhostmode = async (req, res) => {
  try {
    const userId = req.user._id;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.isGhost = !user.isGhost; // 🔥 TOGGLE
    await user.save();

    return res.status(200).json({
      success: true,
      message: user.isGhost
        ? "Ghost mode enabled"
        : "Ghost mode disabled",
      user,
    });
  } catch (error) {
    console.error("Error toggling ghost mode:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
