
import { Request, Response } from "express";
import { GetPermissionSubPermissionsUseCase } from "./RelationPermission";

export class GetPermissionSubPermissionsController {
  private getPermissionSubPermissionsUseCase: GetPermissionSubPermissionsUseCase;

  constructor() {
    this.getPermissionSubPermissionsUseCase = new GetPermissionSubPermissionsUseCase();
  }

  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const { permissaoId } = req.params;

      if (!permissaoId) {
        return res.status(400).json({ error: "O ID da permissão é obrigatório." });
      }

      const subPermissoes = await this.getPermissionSubPermissionsUseCase.execute(permissaoId);

      return res.status(200).json(subPermissoes);
    } catch (error: any) {
      return res.status(500).json({ error: error.message || "Erro ao consultar subpermissões." });
    }
  }
}
