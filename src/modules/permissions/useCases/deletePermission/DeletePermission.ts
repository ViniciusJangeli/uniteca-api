import { prisma } from "../../../../prisma/client";

export class DeletePermissionUseCase {
  async execute(permissaoId: string): Promise<void> {
    if (!permissaoId) {
      throw new Error("O ID da permissão é obrigatório.");
    }

    await prisma.$transaction(async (tx) => {
      await tx.permissoesRelacao.deleteMany({
        where: {
          permissaoId,
        },
      });

      await tx.permissao.delete({
        where: {
          id: permissaoId,
        },
      });
    });
  }
}