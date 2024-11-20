import { prisma } from "../../../../prisma/client";
import { UpdatePermissionDTO } from "../../dtos/UpdatePermissionDTO";
import { Permissao } from "@prisma/client";

export class UpdatePermissionUseCase {
  async execute(id: string, { titulo, subpermissoes }: UpdatePermissionDTO): Promise<Permissao> {
    const permission = await prisma.permissao.findUnique({
      where: { id },
    });

    if (!permission) {
      throw new Error("Permissão não encontrada!");
    }

    // Atualizando a permissão
    return await prisma.permissao.update({
      where: { id },
      data: {
        titulo,
        permissoesRelacao: {
          deleteMany: {},
          create: subpermissoes.map((subPermissaoId) => ({
            subPermissaoId,
          })),
        },
      },
    });
  }
}
