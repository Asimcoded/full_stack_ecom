import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/userauth.model.js";
import {
  generateAccessToken,
  generatePasswordResetToken,
  generateRefreshToken,
  revokeRefreshToken,
  rotateRefreshToken,
} from "../services/token.service.js";
import { Transporter } from "../configs/mail.config.js";

export const signupController = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400).json({
      message: "Name, Email, and Password is needed",
    });
  }
  try {
    const hashpassword = await bcrypt.hash(password, 6);
    const user = new User({
      name,
      email,
      password: hashpassword,
    });
    const result = await user.save();
    res.status(201).json({
      message: "Signup Successfully",
    });
  } catch (err) {
    if (err.code == 11000) {
      if (Object.keys(err.keyPattern)[0] == "email") {
        res.status(409).json({
          message: "Email is already used!",
        });
      }
      if (Object.keys(err.keyPattern)[0] == "name") {
        res.status(409).json({
          message: "Name is already used!",
        });
      }
    }
    console.error(err);

    res.status(400).json({
      message: "Internal Server Error",
    });
  }
};

export const loginController = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({
      message: "Email, and Password is needed",
    });
    return;
  }
  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({
        message: "User not exist",
      });
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.status(401).json({
        message: "Invaid password",
      });
    const accessToken = generateAccessToken(user);
    const refreshToken = await generateRefreshToken(user);
    res.status(201).json({
      message: "Login Successfully",
      tokens: {
        accessToken,
        refreshToken,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({
      message: "Internal Server Error",
    });
  }
};

export const refresh = async (req, res) => {
  if (!req.body)
    return res.status(401).json({ message: "Refresh token missing" });

  const { refreshToken } = req.body;

  if (!refreshToken)
    return res.status(401).json({ message: "Refresh token missing" });

  try {
    const tokens = await rotateRefreshToken(refreshToken);
    res.json(tokens);
  } catch (err) {
    res.status(403).json({ message: "Invalid refresh token" });
  }
};

export const logout = async (req, res) => {
  const { refreshToken } = req.body;

  await revokeRefreshToken(refreshToken);

  res.json({ message: "Logged out successfully" });
};

// reset password

export const resetPassword = async (req, res) => {
  if (!req.body)
    return res.status(401).json({ message: "Something went wrong!" });

  const { email } = req.body;

  if (!email) return res.status(401).json({ message: "Email missing" });
  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({
        message: "Invaild Email!",
      });

    const resetToken = await generatePasswordResetToken(user);
    console.log("Runi");

    const resetUrl = `http://localhost:5173/reset-password/${resetToken}`;
    const option = {
      from: `"Support Team" <${process.env.EMAIL}>`,
      to: email,
      subject: "Password Reset Request",
      text: `You requested a password reset. Please click the link below to reset your password. This link is valid for 10 minutes: ${resetUrl}`,
      html: `
    <div style="font-family: sans-serif; max-width: 600px; margin: auto;">
      <h2>Password Reset</h2>
      <p>We received a request to reset your password. Click the button below to proceed:</p>
      <a href="${resetUrl}" 
         style="background: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">
         Reset My Password
      </a>
      <p style="margin-top: 20px; font-size: 0.8em; color: #666;">
        If you didn't request this, you can safely ignore this email. 
        This link will expire in <b>15 minutes</b>.
      </p>
    </div>
  `,
    };
    await Transporter.sendMail(option, (err, info) => {
      if (err) return res.status(408).json({ message: "Fail to send email!" });
      console.log(info);
      res.status(201).json({ message: "Mail send" });
    });
  } catch (err) {
    console.log(err);

    res.status(403).json({ message: "Invalid refresh token" });
  }
};

export const verifyPasswordResetToken = async (req, res, next) => {
  const token = req.body.token;
  try {
    const decoded = jwt.verify(token, process.env.RESET_PASSWORD_SECRET);

    if (decoded.type !== "password_reset") {
      throw new Error("Invalid token type");
    }
    const user = await User.findById(decoded.sub);
    if (!user) {
      throw new Error("User not found");
    }
    res.status(201).json({
      message: "Token verified",
      userId: user._id,
    });
  } catch (err) {
    console.log(err);
    res.status(408).json({
      message: "Token expired",
    });
  }
};

export const setNewPassword = async (req, res) => {
  const { password, userId } = req.body;
  console.log(password);

  if (!password) {
    res.status(400).json({
      message: "Password is needed",
    });
  }
  try {
    const hashpassword = await bcrypt.hash(password, 6);
    const result = await User.findByIdAndUpdate(
      userId,
      { $set: { password: hashpassword } },
      { new: true },
    );
    if (!result) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(201).json({
      message: "Password updated successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({
      message: "Internal Server Error",
    });
  }
};
