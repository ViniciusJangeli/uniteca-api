import { Request, Response } from "express";
import { UpdatePermissionUseCase } from "./UpdatePermission";

export class UpdatePermissionController {
  private updatePermissionUseCase: UpdatePermissionUseCase;

  constructor() {
    this.updatePermissionUseCase = new UpdatePermissionUseCase();
  }

  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { titulo, subpermissoes } = req.body;

    try {
      const permission = await this.updatePermissionUseCase.execute(id, { titulo, subpermissoes });
      return res.status(200).json({
        message: "Permissão atualizada com sucesso!",
        permission,
      });
    } catch (error: any) {
      return res.status(500).json({ error: "Erro ao atualizar permissão" });
    }
  }
}
