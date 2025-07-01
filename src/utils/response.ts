import { Response } from "express";

export class ResponseHelper {
  static success(
    res: Response,
    data: any = null,
    message: string = "Success",
    status: number = 200
  ) {
    return res.status(status).json({
      success: true,
      data,
      message,
    });
  }
}
