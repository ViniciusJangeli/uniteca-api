import { prisma } from "../../../../prisma/client";
import { CalculateFineDTO } from "../../dtos/CalculateFineDTO";

export class CalculateFineUseCase {
    async execute({ emprestimoId, valorPorDia }: CalculateFineDTO): Promise<{ multa: number }> {
      const loan = await prisma.emprestimo.findUnique({ where: { id: emprestimoId } });
  
      if (!loan || !loan.dataDevolucaoPrevista) {
        throw new Error("Empréstimo não encontrado ou data de devolução não definida");
      }
  
      const hoje = new Date();
      const diasAtraso = Math.max(0, Math.ceil((hoje.getTime() - loan.dataDevolucaoPrevista.getTime()) / (1000 * 60 * 60 * 24)));
  
      return { multa: diasAtraso * valorPorDia };
    }
  }
  