import { prisma } from "../../../../prisma/client";
import { CheckBookAvailabilityDTO } from "../../dtos/AvailabilityDTO";

export class CheckBookAvailabilityUseCase {
  async execute(livroId: string): Promise<CheckBookAvailabilityDTO> {
    try {


      const livro = await prisma.livro.findUnique({
        where: { id: livroId },
        select: { totalExemplares: true },
      });

      if (!livro) {
        throw new Error("Livro não encontrado");
      }

      const emprestimosAtivos = await prisma.emprestimo.count({
        where: { livroId, status: "Emprestado" },
      });

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
