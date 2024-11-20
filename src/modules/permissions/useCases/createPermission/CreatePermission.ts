import { prisma } from "../../../../prisma/client";
import { CreatePermissionDTO } from "../../dtos/CreatePermissionDTO";
import { Permissao } from "@prisma/client";

export class CreatePermissionUseCase {
  async execute({ titulo, subpermissoes }: CreatePermissionDTO): Promise<Permissao> {
    const permissionAlreadyExists = await prisma.permissao.findUnique({
      where: { titulo },
    });

    if (permissionAlreadyExists) {
      throw new Error("Permissão já existe!");
    }

    const permission = await prisma.permissao.create({
      data: {
        titulo,
        permissoesRelacao: {
          create: subpermissoes.map((subPermissaoId) => ({
            subPermissaoId,
          })),
        },
      },
    });

    return permission;
  }
}
