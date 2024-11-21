import { Emprestimo } from "@prisma/client";
import { prisma } from "../../../../prisma/client";

export class GetAllLoansUseCase {
    async execute(): Promise<Emprestimo[]> {
      return await prisma.emprestimo.findMany({ include: { livro: true, usuario: true } });
    }
  }
  