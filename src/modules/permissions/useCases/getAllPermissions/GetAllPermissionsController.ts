import { Request, Response } from "express";
import { GetPermissionsUseCase } from "./GetAllPermissions";

export class GetPermissionsController {
  private getPermissionsUseCase: GetPermissionsUseCase;

  constructor() {
    this.getPermissionsUseCase = new GetPermissionsUseCase();
  }

  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const permissions = await this.getPermissionsUseCase.execute();
      return res.status(200).json(permissions);
    } catch (error: any) {
      return res.status(500).json({ error: "Erro ao obter permissões" });
    }
  }
}
