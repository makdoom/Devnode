import { NextFunction } from "express";
import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserType } from "../types/user.types";

type UserSchemaType = UserType & Document;

// Create user schema
const userSchema = new Schema<UserSchemaType>(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
      minlength: [3, "fullname must be 3 letters long"],
    },
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
      minlength: [3, "Username must be 3 letters long"],
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      trim: true,
    },

    bio: {
      type: String,
      maxlength: [200, "Bio should not be more than 200"],
      default: "",
    },
    avatar: {
      type: String,
    },
    refreshToken: String,
  },
  { timestamps: true }
);

// Pre Hook to Hash password before saving any user
userSchema.pre("save", async function (next: NextFunction) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Injecting custom methods to check password
userSchema.methods.isPasswordCorrect = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

// Generate access token
userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
      fullName: this.fullName,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
  );
};

// Generate refresh token
userSchema.methods.generateRefreshToken = function () {
  return jwt.sign({ _id: this._id }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
  });
};

export const User = mongoose.model<UserSchemaType>("User", userSchema);
