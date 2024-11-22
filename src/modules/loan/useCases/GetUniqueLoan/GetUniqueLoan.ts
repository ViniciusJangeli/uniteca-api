import { Emprestimo } from "@prisma/client";
import { GetUserLoansDTO } from "../../dtos/GetUniqueLoan";
import { prisma } from "../../../../prisma/client";

export class GetUserLoansUseCase {
  async execute({ usuarioId }: GetUserLoansDTO): Promise<Emprestimo[]> {
    return await prisma.emprestimo.findMany({
      where: {
        usuarioId,
        status: 'Emprestado',
      },
      include: {
        livro: true,
      },
    });
  }
}
