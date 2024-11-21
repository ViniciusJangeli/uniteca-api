import { Emprestimo } from "@prisma/client";
import { prisma } from "../../../../prisma/client";
import { CreateLoanDTO } from "../../dtos/CreateLoanDTO";

export class CreateLoanUseCase {
  async execute({
    usuarioId,
    livroId,
    dataDevolucaoPrevista,
  }: CreateLoanDTO): Promise<{ data: Emprestimo; message: string }> {
    const loan = await prisma.emprestimo.create({
      data: {
        usuarioId,
        livroId,
        dataDevolucaoPrevista,
      },
    });

    return { data: loan, message: "Empréstimo criado com sucesso" };
  }
}
