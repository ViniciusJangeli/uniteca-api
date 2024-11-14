import { Request, Response } from "express";
import { CreateUserUseCase } from "./CreateUser";



export class CreateUserController {

 async handle(req: Request, res: Response){
    const { email, senha, nome, cpf, telefone } = req.body

    const useCase = new CreateUserUseCase()

    const result = await useCase.execute({email, senha, nome, cpf, telefone})

    return res.status(201).json(result)
 }
}