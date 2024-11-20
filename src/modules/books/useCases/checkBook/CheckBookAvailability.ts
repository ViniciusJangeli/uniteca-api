import { prisma } from "../../../../prisma/client";
import { CheckBookAvailabilityDTO } from "../../dtos/AvailabilityDTO";

export class CheckBookAvailabilityUseCase {
  async execute(livroId: string): Promise<CheckBookAvailabilityDTO> {
    try {

      // Obter o total de exemplares do livro
      const livro = await prisma.livro.findUnique({
        where: { id: livroId },
        select: { totalExemplares: true },
      });

      if (!livro) {
        throw new Error("Livro não encontrado");
      }

      // Contar empréstimos ativos
      const emprestimosAtivos = await prisma.emprestimo.count({
        where: { livroId, status: "emprestado" },
      });

      // Calcular exemplares disponíveis
      const exemplaresDisponiveis = livro.totalExemplares - emprestimosAtivos;

      return {
        disponivel: exemplaresDisponiveis > 0,
        exemplaresDisponiveis,
      };
    } catch (error) {
      throw new Error("Erro ao verificar a disponibilidade do livro");
    }
  }
}
