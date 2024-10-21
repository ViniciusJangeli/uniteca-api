import { Router } from "express";
import { userRoutes } from "./user.routes";
import { loginRoutes } from "./login.routes";

const routes = Router()

routes.use("/users", userRoutes)
routes.use("/auth", loginRoutes)


export {routes}