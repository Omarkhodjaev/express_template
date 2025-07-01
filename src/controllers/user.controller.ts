import { Request, Response, NextFunction } from "express";
import { UserService } from "../services/user.service";
import { RegisterDto, LoginDto } from "../dto/user.dto";
import { UpdateUserDto } from "../dto/user-update.dto";
import { ResponseHelper } from "../utils/response";

export class UserController {
  constructor(private userService = new UserService()) {}

  async register(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const dto = Object.assign(new RegisterDto(), req.body);
      const user = await this.userService.register(dto);
      ResponseHelper.success(res, user, "User registered successfully", 201);
    } catch (err) {
      next(err);
    }
  }

  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const dto = Object.assign(new LoginDto(), req.body);
      const result = await this.userService.login(dto);
      res.set("Authorization", `Bearer ${result.token}`);
      ResponseHelper.success(res, result, "Login successful");
    } catch (err) {
      next(err);
    }
  }

  async getUsers(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const users = await this.userService.getUsers();
      ResponseHelper.success(res, users, "User list");
    } catch (err) {
      next(err);
    }
  }

  async getUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const user = await this.userService.getUser(Number(req.params.id));
      ResponseHelper.success(res, user, "User found");
    } catch (err) {
      next(err);
    }
  }

  async updateUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const dto = Object.assign(new UpdateUserDto(), req.body);
      const user = await this.userService.updateUser(
        Number(req.params.id),
        dto
      );
      ResponseHelper.success(res, user, "User updated");
    } catch (err) {
      next(err);
    }
  }

  async deleteUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const result = await this.userService.deleteUser(Number(req.params.id));
      ResponseHelper.success(res, result, "User deleted");
    } catch (err) {
      next(err);
    }
  }
}
