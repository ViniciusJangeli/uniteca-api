import { Router } from "express";
import { CreatePermissionController } from "../modules/permissions/useCases/createPermission/CreatePermissionController";
import { GetPermissionsController } from "../modules/permissions/useCases/getAllPermissions/GetAllPermissionsController";
import { GetSubPermissionsController } from "../modules/permissions/useCases/getAllSubPermissions/GetAllSubPermissionsController";
import { UpdatePermissionController } from "../modules/permissions/useCases/updatePermission/UpdatePermissionController";
import { DeletePermissionController } from "../modules/permissions/useCases/deletePermission/DeletePermissionController";
import { GetPermissionSubPermissionsController } from "../modules/permissions/useCases/relationPermission/RelationPermissionController";

const permissaoRoutes = Router();

const createPermissionController = new CreatePermissionController();
const getPermissionsController = new GetPermissionsController();
const getSubPermissionsController = new GetSubPermissionsController();
const editPermissionController = new UpdatePermissionController();
const deletePermissionController = new DeletePermissionController();
const getPermissionSubPermissionsController = new GetPermissionSubPermissionsController();


permissaoRoutes.post("/criar", async (req, res) => {
  await createPermissionController.handle(req, res);
});

permissaoRoutes.get("/consultar/permissoes", async (req, res) => {
  await getPermissionsController.handle(req, res);
});

permissaoRoutes.get("/consultar/subpermissoes", async (req, res) => {
  await getSubPermissionsController.handle(req, res);
});

permissaoRoutes.put("/editar/:id", async (req, res) => {
  await editPermissionController.handle(req, res);
});

permissaoRoutes.delete("/excluir/:id", async (req, res) => {
  await deletePermissionController.handle(req, res);
});

permissaoRoutes.get(
  "/consultar/relacao/:permissaoId",
  async (req, res) => { 
    await getPermissionSubPermissionsController.handle(req, res)
  }
);

export { permissaoRoutes };
