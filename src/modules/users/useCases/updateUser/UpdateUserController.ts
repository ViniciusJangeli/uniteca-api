import { Request, Response } from "express";
import { UpdateUserUseCase } from "./UpdateUser";

export class UpdateUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id: usuarioId } = req.params;
    const { email, nome, cpf, telefone, permissaoId } = req.body;
    const useCase = new UpdateUserUseCase();

    try {
      const updatedUser = await useCase.execute({
        usuarioId,
        email,
        nome,
        cpf,
        telefone,
        permissaoId,
      });

      return res.status(200).json({
        message: "Usuário atualizado com sucesso!",
        updatedUser,
      });
    } catch (error: any) {
      if (error.message === "Usuário não encontrado") {
        return res.status(404).json({ error: error.message });
      }
      return res.status(500).json({ error: "Erro ao atualizar usuário" });
    }
  }
}
