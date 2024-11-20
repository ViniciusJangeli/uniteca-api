import { Request, Response } from "express";
import { CreatePermissionUseCase } from "./CreatePermission";

export class CreatePermissionController {
  private createPermissionUseCase: CreatePermissionUseCase;

  constructor() {
    this.createPermissionUseCase = new CreatePermissionUseCase();
  }

  async handle(req: Request, res: Response): Promise<Response> {
    const { titulo, subpermissoes } = req.body;
    try {
      const permission = await this.createPermissionUseCase.execute({ titulo, subpermissoes });
      return res.status(201).json({
        message: "Permissão criada com sucesso!",
        permission,
      });
    } catch (error: any) {
      if (error.message === "Permissão já existe!") {
        return res.status(409).json({ message: error.message });
      }

      return res.status(500).json({ error: "Erro ao criar permissão" });
    }
  }
}
