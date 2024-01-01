import { NextFunction, Request, Response } from "express";

type requestHandlerType = (
  req: Request,
  res: Response,
  next: NextFunction
) => void;

const asyncHandler = (requestHandler: requestHandlerType) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(requestHandler(req, res, next)).catch((error) => {
      next(error);
    });
  };
};

export { asyncHandler };
