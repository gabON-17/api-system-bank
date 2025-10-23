import { Router } from "express";
import { AuthController } from "../auth/auth.controller";

export const routesAuth = Router();
const authController = new AuthController();

routesAuth.post("/login", authController.login.bind(authController));
