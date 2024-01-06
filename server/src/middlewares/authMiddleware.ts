import { NextFunction, Response } from "express";
import { User } from "../models/user.model";
import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/asynHandler";
import ApiError from "../utils/ApiError";
import { CustomRequest } from "../types/custom.types";

type JWTPayloadType = {
  _id: string;
  email: string;
  username: string;
  fullName: string;
  iat: number;
  exp: number;
};

export const verifyJWT = asyncHandler(
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
      const token =
        req.cookies.accessToken ||
        req.headers.authorization.replace("Bearer ", "");
      if (!token) throw new ApiError(401, "Unauthorized request");

      const decodedData = jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET
      ) as JWTPayloadType;

      const user = await User.findById(decodedData._id).select(
        "-password -refreshToken"
      );
      if (!user) throw new ApiError(401, "Invalid access token");

      req.user = user;
      next();
    } catch (error) {
      throw new ApiError(401, "Invalid access token");
    }
  }
);
