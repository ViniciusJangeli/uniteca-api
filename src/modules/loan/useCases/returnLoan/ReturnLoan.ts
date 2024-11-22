import { prisma } from "../../../../prisma/client";
import { ReturnLoanDTO } from "../../dtos/ReturnLoanDTO";

export class ReturnLoanUseCase {
  async execute({
    emprestimoId,
    dataDevolucao,
    valorMulta,
  }: ReturnLoanDTO): Promise<{ message: string }> {

    const loan = await prisma.emprestimo.findUnique({
      where: { id: emprestimoId },
      include: {
        livro: true, 
      }
    });

    if (!loan) {
      throw new Error("Empréstimo não encontrado");
    }

    const dataPrevista = loan.dataDevolucaoPrevista ? new Date(loan.dataDevolucaoPrevista) : null;
    
    if (!dataPrevista) {
      throw new Error("Data de devolução prevista não encontrada");
    }

    const dataDevolucaoDate = new Date(dataDevolucao);

    if (dataDevolucaoDate > dataPrevista) {

      await prisma.historicoMultas.create({
        data: {
          emprestimoId: emprestimoId,
          valorMulta,
          status: "Pendente",
        }
      });
    }

    await prisma.emprestimo.update({
      where: { id: emprestimoId },
      data: {
        dataDevolucao,
        status: "Devolvido",
      },
    });

    return { message: "Devolução registrada com sucesso" };
  }
}
