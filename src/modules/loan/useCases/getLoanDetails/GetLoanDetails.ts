import { prisma } from "../../../../prisma/client";
import { GetLoanDetailsDTO } from "../../dtos/GetLoanDetailsDTO";
import { Emprestimo } from "@prisma/client";

export class GetLoanDetailsUseCase {
  async execute({ emprestimoId }: GetLoanDetailsDTO): Promise<Emprestimo | null> {
    const loanDetails = await prisma.emprestimo.findUnique({
      where: {
        id: emprestimoId,
      },
      include: {
        livro: true,
        usuario: true,
        historicoMultas: true,
      },
    });

    return loanDetails;
  }
}
