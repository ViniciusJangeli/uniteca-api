import { Router } from "express";
import { CreateUserController } from "../modules/users/useCases/createUser/CreateUserController";

const createUserController = new CreateUserController();

const usuariosRoutes = Router();

usuariosRoutes.post("/criar", async (req, res) => {
  await createUserController.handle(req, res);
});

export { usuariosRoutes };
