import { NextFunction, Request, Response } from "express";

const notFound = (req: Request, res: Response, next: NextFunction) => {
  const error = new Error(`Not found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

const errorHandler = (err, req: Request, res: Response, next: NextFunction) => {
  let statusCode = err.statusCode ? err?.statusCode : 500;
  let message = err.message ? err.message : "Internal Server Error";

  // Mongoose special type of error
  if (err?.name == "CastError" && err?.kind === "ObjectId") {
    statusCode = 404;
    message = "Resources not found";
  }

  res.status(statusCode).json({
    statusCode,
    message,
    stack: process.env.NODE_ENV === "production" ? null : err?.stack,
    success: false,
  });
};

export { notFound, errorHandler };
