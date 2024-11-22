import { Router } from "express";
import { usuariosRoutes } from "./usuarios.routes";
import { loginRoutes } from "./login.routes";
import { livrosRoutes } from "./livros.routes";
import { permissaoRoutes } from "./permissoes.routes";
import { emprestimoRoutes } from "./emprestimo.routes";
import statsRoutes from "./stats.routes";

const routes = Router()

routes.use("/usuarios", usuariosRoutes)
routes.use("/auth", loginRoutes)
routes.use("/livros", livrosRoutes)
routes.use("/permissoes", permissaoRoutes)
routes.use("/emprestimo", emprestimoRoutes)
routes.use("/status", statsRoutes)


export {routes}