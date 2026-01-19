import jwt from "jsonwebtoken";
import User from "../model/userModel.js";

export const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.jwt_secret, { expiresIn: "2d" });
};

export const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Not authorized, token missing",
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.jwt_secret);

    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User no longer exists",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Auth error:", error);
    return res.status(401).json({
      success: false,
      message: "Not authorized, token invalid",
    });
  }
};
