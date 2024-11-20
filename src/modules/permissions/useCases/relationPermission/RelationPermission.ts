import { prisma } from "../../../../prisma/client";



export class GetPermissionSubPermissionsUseCase {
  async execute(permissaoId: string): Promise<SubPermission[]> {
    if (!permissaoId) {
      throw new Error("O ID da permissão é obrigatório.");
    }

    const subPermissoes = await prisma.permissoesRelacao.findMany({
      where: {
        permissaoId,
      },
      select: {
        subPermissao: {
          select: {
            id: true,
            descricao: true,
          },
        },
      },
    });

    if (!subPermissoes || subPermissoes.length === 0) {
      throw new Error("Nenhuma subpermissão encontrada para esta permissão.");
    }

    // Formatar o retorno para conter apenas `id` e `descricao` diretamente no array
    return subPermissoes.map(relacao => relacao.subPermissao);
  }
}
