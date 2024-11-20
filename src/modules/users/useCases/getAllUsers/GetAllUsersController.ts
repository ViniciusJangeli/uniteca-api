import { Request, Response } from "express";
import { GetAllUsersUseCase } from "./GetAllUsers";

export class GetAllUsersController {
  async handle(req: Request, res: Response): Promise<Response> {
    const useCase = new GetAllUsersUseCase();

    try {

      const users = await useCase.execute();

      return res.status(200).json(users);
    } catch (error: any) {
      return res.status(500).json({ error: "Erro ao obter usuários" });
    }
  }
}
