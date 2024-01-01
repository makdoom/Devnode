import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../utils/asynHandler";
import ApiResponse from "../utils/ApiResponse";
import ApiError from "../utils/ApiError";
import { validateEmail } from "../utils";
import { User } from "../models/user.model";

const rootRoute = asyncHandler(async (req: Request, res: Response) => {
  res
    .status(200)
    .json(
      new ApiResponse(200, "User fetched successfully", { username: "Makdoom" })
    );
});

const registerRoute = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { fullName, username, email, password } = req.body;
    if (!fullName || !username || !email || !password) {
      throw new ApiError(400, "All fields are required");
    }

    // Email validation
    const isEmailValid = validateEmail(email);
    if (!isEmailValid) throw new ApiError(400, "Email is invalid");

    // Check if username is already taken
    const isUsernameTaken = await User.findOne({ username });
    if (isUsernameTaken) throw new ApiError(409, "Username is already taken");

    // Check if email is already taken
    const isEmailTaken = await User.findOne({ email });
    if (isEmailTaken) throw new ApiError(409, "Email is already in use");

    console.log({ fullName, username, email, password });
    return res
      .status(200)
      .json(new ApiResponse(200, "User registered successfully", {}));
  }
);

export { rootRoute, registerRoute };
