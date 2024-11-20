import { Loan } from "@prisma/client";
import { prisma } from "../../../../prisma/client";
import { LoanDTO } from "../../dtos/LoanDTO";

export class LoanBookUseCase {
  async execute({ userId, bookCopyId, loanDate, expectedReturnDate }: LoanDTO): Promise<Loan> {
    const loan = await prisma.loan.create({
      data: { userId, bookCopyId, loanDate, expectedReturnDate }
    });

    await prisma.bookCopy.update({
      where: { id: bookCopyId },
      data: { isAvailable: false }
    });

    return loan;
  }
}
