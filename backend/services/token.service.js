import jwt from "jsonwebtoken";
import "dotenv/config"
import bcrypt from "bcrypt";
import RefreshToken from "../models/refreshToken.model.js";
import PasswordReset from "../models/passwordreset.model.js";

export const generateAccessToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN },
  );
};

export const generateRefreshToken = async (user) => {
  const token = jwt.sign({ id: user._id }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN,
  });
  await RefreshToken.create({
    user: user._id,
    token,
  });

  return token;
};

export const rotateRefreshToken = async (oldToken) => {
  const storedToken = await RefreshToken.findOne({ token: oldToken });
  
  if (!storedToken) {
      throw new Error("Invalid refresh token");
    }

  const decoded = jwt.verify(oldToken, process.env.REFRESH_TOKEN_SECRET);

  await RefreshToken.deleteOne({ token: oldToken });

  const newAccessToken = generateAccessToken({ _id: decoded.id });
  const newRefreshToken = await generateRefreshToken({ _id: decoded.id });

  return {
    accessToken: newAccessToken,
    refreshToken: newRefreshToken,
  };
};

export const revokeRefreshToken = async (token) => {
  await RefreshToken.deleteOne({ token });
};

export const generatePasswordResetToken = async (user) => {
  const token = jwt.sign(
    {
      sub: user._id,
      type: 'password_reset',
    },
    process.env.RESET_PASSWORD_SECRET,
    { expiresIn: process.env.RESET_TOKEN_EXPIRES_IN }
  );
  await PasswordReset.create({
    user: user._id,
     token,
    expiresAt: new Date(Date.now() + 10 * 60 * 1000), 
  });

  return token; 
};

