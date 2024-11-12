import { Router } from "express";
import { userRoutes } from "./user.routes";
import { loginRoutes } from "./login.routes";
import { booksRoutes } from "./books.routes";

const routes = Router()

routes.use("/users", userRoutes)
routes.use("/auth", loginRoutes)
routes.use("/book", booksRoutes)


export {routes}