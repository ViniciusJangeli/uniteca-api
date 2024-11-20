import { Request, Response } from "express";
import { DeletePermissionUseCase } from "./DeletePermission";

export class DeletePermissionController {
  private deletePermissionUseCase: DeletePermissionUseCase;

  constructor() {
    this.deletePermissionUseCase = new DeletePermissionUseCase();
  }

  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ error: "O ID da permissão é obrigatório." });
      }

      await this.deletePermissionUseCase.execute(id);

      return res.status(200).json({ message: "Permissão excluída com sucesso." });
    } catch (error: any) {
      return res.status(500).json({ error: error.message || "Erro ao excluir permissão." });
    }
  }
}