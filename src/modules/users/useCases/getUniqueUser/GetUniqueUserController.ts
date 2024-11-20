import { Request, Response } from "express";
import { GetUniqueUserUseCase } from "./GetUniqueUser";

export class GetUniqueUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id: usuarioId } = req.params;

    const useCase = new GetUniqueUserUseCase();

    try {
      const user = await useCase.execute({ usuarioId });

      if (!user) {
        return res.status(404).json({ error: "Usuário não encontrado" });
      }

      return res.status(200).json(user);
    } catch (error: any) {
      return res.status(500).json({ error: "Erro ao obter usuário" });
    }
  }
}
