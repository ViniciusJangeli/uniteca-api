import { Router } from "express";
import { CreateUserController } from "../modules/users/useCases/createUser/CreateUserController";
import { GetAllUsersController } from "../modules/users/useCases/getAllUsers/GetAllUsersController";
import { GetUniqueUserController } from "../modules/users/useCases/getUniqueUser/GetUniqueUserController";
import { UpdateUserController } from "../modules/users/useCases/updateUser/UpdateUserController";

const createUserController = new CreateUserController();
const getAllUsersController = new GetAllUsersController();
const getUniqueUserController = new GetUniqueUserController();
const updateUserController = new UpdateUserController();

const usuariosRoutes = Router();

usuariosRoutes.post("/criar", async (req, res) => {
  await createUserController.handle(req, res);
});

usuariosRoutes.get("/consultar/todos", async (req, res) => {
  await getAllUsersController.handle(req, res);
});

usuariosRoutes.get("/consultar/:id", async (req, res) => {
  await getUniqueUserController.handle(req, res);
});

usuariosRoutes.put("/editar/:id", async (req, res) => {
  await updateUserController.handle(req, res);
});

export { usuariosRoutes };
