import { prisma } from "../../../../../prisma/client";

export class GetOneBookUseCase {
  async execute(id: string) {
    try {
      const livro = await prisma.livro.findUnique({
        where: { id },
        select: {
          id: true,
          titulo: true,
          autor: true,
          ano: true,
          edicao: true,
          editora: true,
          volume: true,
          isbn: true,
          totalPaginas: true,
          totalExemplares: true,
          criadoPorId: true,
          criadoEm: true,
          atualizadoEm: true
        }
      });
      return livro;
    } catch (error) {
      throw new Error("Erro ao obter livro");
    }
  }
}
