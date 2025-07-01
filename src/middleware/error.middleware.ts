import { Request, Response, NextFunction } from "express";

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const status = err.status || 500;
  const message = err.message || "Internal Server Error";
  const details = err.details || null;

  res.status(status).json({
    success: false,
    error: {
      code: status,
      message,
      details,
    },
  });
}
