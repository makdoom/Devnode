import { Response } from "express";
import { asyncHandler } from "../utils/asynHandler";
import ApiResponse from "../utils/ApiResponse";
import { Blog, BlogScType, BlogSchemaType } from "../models/blog.model";
import { CustomRequest } from "../types/custom.types";
import mongoose from "mongoose";
import ApiError from "../utils/ApiError";
import { deleteOnCloudinary, uploadOnCloudinary } from "../utils/cloudinary";

const createBlog = asyncHandler(async (req: CustomRequest, res: Response) => {
  const {
    title,
    contents = [],
    subtitle = "",
    isDraft = true,
    isPublished = false,
    coverImage = "",
  } = req.body;

  // Create new blog post
  const createdBlogPost = await Blog.create({
    title,
    contents,
    subtitle,
    isDraft,
    isPublished,
    coverImage,
    author: req.user._id,
  });

  res
    .status(201)
    .json(new ApiResponse(200, "Blog created successfully", createdBlogPost));
});

const getBlogs = asyncHandler(async (req: CustomRequest, res: Response) => {
  const blogList = await Blog.aggregate([
    {
      $match: {
        author: new mongoose.Types.ObjectId(req.user._id),
      },
    },
    {
      $lookup: {
        from: "users", // the name of the users collection
        localField: "author",
        foreignField: "_id",
        as: "author",
      },
    },
    {
      $unwind: "$author",
    },
    {
      $sort: {
        createdAt: -1,
      },
    },
    {
      $project: {
        title: 1,
        subtitle: 1,
        contents: 1,
        tags: 1,
        coverImage: 1,
        createdAt: 1,
        isPublished: 1,
        isDraft: 1,
        "author.fullName": 1,
        "author.username": 1,
      },
    },
  ]);

  res
    .status(201)
    .json(new ApiResponse(200, "Blog fetched successfully", blogList));
});

const updateBlogCoverImage = asyncHandler(
  async (req: CustomRequest, res: Response) => {
    const { blogId } = req.body;

    const coverLocalImagePath = req.file?.path;
    if (!coverLocalImagePath)
      throw new ApiError(400, "Cover Image file is missing");

    const blog = await Blog.findById(blogId);

    const coverImagePublicId = blog.coverImage
      ? blog.coverImage?.split("/")?.at(-1)?.split(".")?.at(0)
      : "";

    const coverImage = await uploadOnCloudinary(coverLocalImagePath);
    if (!coverImage)
      throw new ApiError(400, "Error while uploading cover image");

    const updatedBlog = await Blog.findByIdAndUpdate(
      blogId,
      {
        $set: {
          coverImage: coverImage?.url,
        },
      },
      { new: true }
    );

    if (coverImagePublicId) await deleteOnCloudinary(coverImagePublicId);

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          "Blog cover image updated successfully",
          updatedBlog
        )
      );
  }
);

const deleteImage = asyncHandler(async (req: CustomRequest, res: Response) => {
  const { blogId, coverImagePublicId } = req.body;

  console.log(blogId);
  const updatedBlog = await Blog.findByIdAndUpdate(
    blogId,
    {
      $set: {
        coverImage: "",
      },
    },
    { new: true }
  );

  if (coverImagePublicId) await deleteOnCloudinary(coverImagePublicId);

  res
    .status(200)
    .json(
      new ApiResponse(200, "Blog cover image deleted successfully", updatedBlog)
    );
});

const updateBlogDetails = asyncHandler(
  async (req: CustomRequest, res: Response) => {
    const { _id, title, subtitle, contents, isDraft, isPublished, tags } =
      req.body;

    if (!title) throw new ApiError(400, "Can not create blog without title");

    const updatedBlog = await Blog.findByIdAndUpdate(_id, {
      title,
      subtitle,
      contents,
      isDraft,
      isPublished,
      tags,
    });

    return res
      .status(200)
      .json(new ApiResponse(200, "Blog updated successfully", updatedBlog));
  }
);

const deleteBlog = asyncHandler(async (req: CustomRequest, res: Response) => {
  const { blogId } = req.body;

  if (!blogId) throw new ApiError(400, "Blog id required to delete blog");

  const deletedDoc = await Blog.findByIdAndDelete(blogId, { new: true });
  if (deletedDoc && deletedDoc.coverImage) {
    const coverImagePublicId = deletedDoc.coverImage
      ?.split("/")
      ?.at(-1)
      ?.split(".")
      ?.at(0);
    if (coverImagePublicId) await deleteOnCloudinary(coverImagePublicId);
  }

  return res
    .status(200)
    .json(new ApiResponse(200, "Blog deleted successfully", {}));
});

export {
  createBlog,
  getBlogs,
  updateBlogCoverImage,
  updateBlogDetails,
  deleteImage,
  deleteBlog,
};
