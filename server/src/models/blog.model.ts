import mongoose, {
  Document,
  ObjectId,
  Schema,
  Types,
  InferSchemaType,
} from "mongoose";

export type BlogSchemaType = {
  title: string;
  subtitle: string;
  contents: string;
  coverImage: string;
  tags: string[];
  author: ObjectId;
  isDraft: boolean;
  isPublished: boolean;
};

interface BlogModel extends BlogSchemaType, Document {}

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

export type BlogScType = InferSchemaType<typeof blogSchema>;

export const Blog = mongoose.model<BlogModel>("Blog", blogSchema);
