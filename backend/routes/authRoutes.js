
import { Router } from "express";
import * as authController from "../controllers/authController.js";

export const AuthRouter = Router();

AuthRouter.post("/api/auth/login", authController.loginUser);
