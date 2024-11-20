import { Request, Response } from "express";
import { GetSubPermissionsUseCase } from "./GetAllSubPermissions";

export class GetSubPermissionsController {
  private getSubPermissionsUseCase: GetSubPermissionsUseCase;

  constructor() {
    this.getSubPermissionsUseCase = new GetSubPermissionsUseCase();
  }

  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const subPermissions = await this.getSubPermissionsUseCase.execute();
      return res.status(200).json(subPermissions);
    } catch (error: any) {
      return res.status(500).json({ error: "Erro ao obter subpermissões" });
    }
  }
}
