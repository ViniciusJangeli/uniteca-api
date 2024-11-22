import { Router } from "express";
import { LoginController } from "../modules/auth/useCases/login/LoginController";
import { VerifyEmailCpfController } from "../modules/auth/useCases/verifyUser/VerifyUserController";
import { UpdatePasswordController } from "../modules/auth/useCases/updatePassword/UpdatePasswordController";

const loginController = new LoginController();
const verifyController = new VerifyEmailCpfController()
const updatePasswordController = new UpdatePasswordController()

const loginRoutes = Router();

loginRoutes.post("/login", async (req, res, next) => {
    await loginController.handle(req, res, next);
  });

loginRoutes.post("/verificar", async (req, res, next) => {
  await verifyController.handle(req, res, next);
});

loginRoutes.post("/nova/senha", async (req, res, next) => {
  await updatePasswordController.handle(req, res, next);
});

export { loginRoutes };
