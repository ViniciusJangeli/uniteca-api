import { prisma } from "../../../../../prisma/client";

export class GetAllBooksUseCase {
    async execute() {
      try {
        const livros = await prisma.livro.findMany({
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
  
        return livros;
      } catch (error) {
        throw new Error("Erro ao obter livros");
      }
    }
  }