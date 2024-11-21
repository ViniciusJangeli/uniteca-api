import { Livro } from "@prisma/client";
import { prisma } from "../../../../prisma/client";

export class GetAvailableBooksUseCase {
  async execute(): Promise<{ livrosDisponiveis: Livro[] }> {
    const livros = await prisma.livro.findMany({
      include: {
        emprestimos: {
          where: { status: "emprestado" },
        },
      },
    });

    const livrosDisponiveis = livros.filter(livro => {
      const livrosEmprestados = livro.emprestimos.length;
      return livrosEmprestados < livro.totalExemplares;
    });

    return { livrosDisponiveis };
  }
}
