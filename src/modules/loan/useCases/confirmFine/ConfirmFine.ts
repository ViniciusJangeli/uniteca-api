import { prisma } from "../../../../prisma/client";
import { ConfirmFinePaymentDTO } from "../../dtos/ConfirmPaymentFineDTO";


export class ConfirmFinePaymentUseCase {
  async execute({ emprestimoId, valorPago }: ConfirmFinePaymentDTO): Promise<void> {
    const emprestimo = await prisma.emprestimo.findUnique({
      where: { id: emprestimoId },
      include: { historicoMultas: true },
    });

    if (!emprestimo) {
      throw new Error('Empréstimo não encontrado');
    }

    const multa = emprestimo.historicoMultas[0];
    if (!multa) {
      throw new Error('Não há multa associada a esse empréstimo');
    }

    if (multa.valorMulta !== valorPago) {
      throw new Error('O valor pago não corresponde ao valor da multa');
    }

    await prisma.historicoMultas.update({
      where: { id: multa.id },
      data: { status: 'Pago' },
    });

    await prisma.emprestimo.update({
      where: { id: emprestimoId },
      data: { status: 'Devolvido' },
    });
  }
}
