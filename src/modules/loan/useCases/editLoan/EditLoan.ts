import { prisma } from "../../../../prisma/client";
import { EditLoanDTO } from "../../dtos/EditLoanDTO";

export class EditLoanUseCase {
    async execute({
      emprestimoId,
      dataDevolucaoPrevista,
      status,
    }: EditLoanDTO): Promise<{ message: string }> {
      const updatedLoan = await prisma.emprestimo.update({
        where: { id: emprestimoId },
        data: {
          ...(dataDevolucaoPrevista && { dataDevolucaoPrevista }),
          ...(status && { status }),
        },
      });
  
      return { message: "Empréstimo atualizado com sucesso" };
    }
  }
  