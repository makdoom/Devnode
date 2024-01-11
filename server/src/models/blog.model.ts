import mongoose, { Schema } from "mongoose";

// Create Blog Schema
const blogSchema = new Schema(
  {
    title: {
      type: String,
      trim: true,
    },
    contents: {
      type: String,
      trim: true,
    },
    authorId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export const Blog = mongoose.model("Blog", blogSchema);
