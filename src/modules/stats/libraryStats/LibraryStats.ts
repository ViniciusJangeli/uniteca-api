import { prisma } from "../../../prisma/client";

export class GetLibraryStatsUseCase {
  async execute() {
    const totalLivros = await prisma.livro.aggregate({
      _sum: {
        totalExemplares: true,
      },
    });

    const totalLivrosCount = totalLivros._sum.totalExemplares ?? 0;

    const livrosEmprestados = await prisma.emprestimo.count({
      where: { status: "Emprestado" },
    });

    const totalDisponiveis = totalLivrosCount - livrosEmprestados;

    const livrosPopularesCount = await prisma.emprestimo.groupBy({
      by: ['livroId'],
      _count: {
        livroId: true,
      },
      orderBy: {
        _count: {
          livroId: 'desc',
        }
      },
      take: 5,
    });

    const livrosPopulares = await prisma.livro.findMany({
      where: {
        id: {
          in: livrosPopularesCount.map(item => item.livroId),
        }
      }
    });

    return {
      totalLivros: totalLivrosCount,
      livrosEmprestados,
      totalDisponiveis,
      livrosPopulares,
    };
  }
}
