import { Router } from "express";
import { LoginController } from "../modules/auth/useCases/login/LoginController";

const loginController = new LoginController();

const loginRoutes = Router();

loginRoutes.post("/login", loginController.handle);

export { loginRoutes };
