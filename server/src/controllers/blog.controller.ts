import { Response } from "express";
import { asyncHandler } from "../utils/asynHandler";
import ApiResponse from "../utils/ApiResponse";
import { Blog } from "../models/blog.model";
import { CustomRequest } from "../types/custom.types";
import mongoose from "mongoose";

const createBlog = asyncHandler(async (req: CustomRequest, res: Response) => {
  const {
    title,
    contents = [],
    subtitle = "",
    isDraft = true,
    isPublished = false,
  } = req.body;

  // Create new blog post
  const createdBlogPost = await Blog.create({
    title,
    contents,
    subtitle,
    isDraft,
    isPublished,
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
    console.log(req.file);
    // const coverLocalImagePath = req.file?.path;
    // if (!coverLocalImagePath)
    //   throw new ApiError(400, "Cover image file is missing");

    // const user = await User.findById(req.user._id);
    // const coverImagePublidId = user.coverImage
    //   ?.split("/")
    //   ?.at(-1)
    //   ?.split(".")
    //   ?.at(0);

    // const coverImage = await uploadOnCloudinary(coverLocalImagePath);
    // if (!coverImage) throw new ApiError(400, "Error while uploading cover image");

    // const updatedUser = await User.findByIdAndUpdate(
    //   req.user._id,
    //   {
    //     $set: {
    //       coverImage: coverImage?.url,
    //     },
    //   },
    //   { new: true }
    // ).select("-password");

    // await deleteOnCloudinary(coverImagePublidId);

    return res.json({ success: 1, data: null });
    // return res
    //   .status(200)
    //   .json(
    //     new ApiResponse(200, updatedUser, "User cover image updated successfully")
    //   );
  }
);

export { createBlog, getBlogs, updateBlogCoverImage };
