import { Request, Response } from "express";
import { CreateUserUseCase } from "./CreateUser";

export class CreateUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { email, senha, nome, cpf, telefone, cargoId } = req.body;

    const useCase = new CreateUserUseCase();

    try {
      const user = await useCase.execute({
        email,
        senha,
        nome,
        cpf,
        telefone,
        cargoId, // Cargo especificado no body
      });

      return res.status(201).json({
        message: "Usuário criado com sucesso!",
        user,
      });
    } catch (error: any) {
      if (error.message === "Usuário já existe") {
        return res.status(409).json({ error: error.message });
      }
      return res.status(500).json({ error: "Erro ao criar usuário" });
    }
  }
}
