import { Request, Response } from "express";
import { asyncHandler } from "../utils/asynHandler";
import ApiResponse from "../utils/ApiResponse";

const rootRoute = asyncHandler(async (req: Request, res: Response) => {
  res
    .status(200)
    .json(
      new ApiResponse(200, "User fetched successfully", { username: "Makdoom" })
    );
});

export { rootRoute };
