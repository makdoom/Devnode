import { CookieOptions, Request, Response } from "express";
import { asyncHandler } from "../utils/asynHandler";
import ApiResponse from "../utils/ApiResponse";
import ApiError from "../utils/ApiError";
import { generateAccessAndRefreshToken, validateEmail } from "../utils";
import { User } from "../models/user.model";
import { CustomRequest } from "../types/custom.types";

const registerUser = asyncHandler(async (req: Request, res: Response) => {
  const { fullName, username, email, password } = req.body;

  if (!fullName) throw new ApiError(400, "Fullname is required");
  if (!username) throw new ApiError(400, "Username is required");
  if (!email) throw new ApiError(400, "Email is required");
  if (!password) throw new ApiError(400, "Password is required");

  // Email validation
  const isEmailValid = validateEmail(email);
  if (!isEmailValid) throw new ApiError(400, "Email is invalid");

  // Check if username is already taken
  const isUsernameTaken = await User.findOne({ username });
  if (isUsernameTaken) throw new ApiError(409, "Username is already taken");

  // Check if email is already taken
  const isEmailTaken = await User.findOne({ email });
  if (isEmailTaken) throw new ApiError(409, "Email is already in use");

  const user = await User.create({
    fullName,
    username: username.toLowerCase(),
    email,
    password,
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );
  if (!createdUser)
    throw new ApiError(500, "Something went wrong while registering the user");

  res
    .status(201)
    .json(new ApiResponse(200, "User created successfully", createdUser));
});

const loginUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email) throw new ApiError(400, "Email is required");

  if (!password) throw new ApiError(400, "Password is required");

  const existedUser = await User.findOne({ email });
  if (!existedUser) throw new ApiError(400, "User doesn't exists");

  const isPasswordValid = existedUser.isPasswordCorrect(password);
  if (!isPasswordValid) throw new ApiError(400, "Invalid user credentials");

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    existedUser._id
  );

  const loggedInUser = await User.findById(existedUser._id).select(
    "-password -refreshToken"
  );

  const cookiesOption: CookieOptions = {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  };

  res
    .status(200)
    .cookie("accessToken", accessToken, cookiesOption)
    .cookie("refreshToken", refreshToken, cookiesOption)
    .json(
      new ApiResponse(200, "User loged in successfully", {
        loggedInUser,
        accessToken,
        refreshToken,
      })
    );
});

const logoutUser = asyncHandler(async (req: CustomRequest, res: Response) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: { refreshToken: undefined },
    },
    { new: true }
  );

  const cookiesOption: CookieOptions = {
    httpOnly: true,
    secure: true,
  };

  res
    .status(200)
    .clearCookie("accessToken", cookiesOption)
    .clearCookie("refreshToken", cookiesOption)
    .json(new ApiResponse(200, "User logged out successfully", {}));
});

export { registerUser, loginUser, logoutUser };
