import mongoose, { Schema } from "mongoose";

// Create Blog Schema
const blogSchema = new Schema(
  {
    title: {
      type: String,
      trim: true,
    },
    subtitle: {
      type: String,
      trim: true,
    },
    contents: {
      type: String,
      trim: true,
    },
    coverImage: {
      type: String,
    },
    tags: { type: [String] },
    author: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    isDraft: {
      type: Boolean,
    },
    isPublished: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

export const Blog = mongoose.model("Blog", blogSchema);
