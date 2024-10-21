import { Request, Response } from "express";
import { CreateUserUseCase } from "./CreateUser";



export class CreateUserController {

 async handle(req: Request, res: Response){
    const { email, name, cpf, password } = req.body

    const useCase = new CreateUserUseCase()

    const result = await useCase.execute({email, name, cpf, password})

    return res.status(201).json(result)
 }
}