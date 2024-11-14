import { Router } from "express";
import { usuariosRoutes } from "./usuarios.routes";
import { loginRoutes } from "./login.routes";
import { livrosRoutes } from "./livros.routes";

const routes = Router()

routes.use("/usuarios", usuariosRoutes)
routes.use("/auth", loginRoutes)
routes.use("/livros", livrosRoutes)


export {routes}