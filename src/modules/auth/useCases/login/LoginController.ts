import { Request, Response } from "express";
import { Login } from "./Login";


export class LoginController{

    async handle(req: Request, res: Response) {
        const {login, password} = req.body
        const useCase = new Login()

        const result = await useCase.execute({login, password})

        return res.status(200).send(result)
    }
}