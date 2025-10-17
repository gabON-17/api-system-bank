import { ResponseService } from "../common/types/response.type";
import { AuthService } from "./auth.service";
import { Request, Response } from "express";

export class AuthController {
  private authService: AuthService;
  constructor() {
    this.authService = new AuthService();
  }
  login(req: Request, res: Response) {
    const resService: ResponseService = this.authService.login(req.body);
    res.status(resService.statusCode).json({ ...resService });
  }
}
