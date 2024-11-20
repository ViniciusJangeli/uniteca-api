import { Router } from "express";
import { usuariosRoutes } from "./usuarios.routes";
import { loginRoutes } from "./login.routes";
import { livrosRoutes } from "./livros.routes";
import { permissaoRoutes } from "./permissoes.routes";

const routes = Router()

routes.use("/usuarios", usuariosRoutes)
routes.use("/auth", loginRoutes)
routes.use("/livros", livrosRoutes)
routes.use("/permissoes", permissaoRoutes)


export {routes}