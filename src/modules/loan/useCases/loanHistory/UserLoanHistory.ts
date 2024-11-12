import { Loan } from "@prisma/client";
import { prisma } from "../../../../prisma/client";

export class UserLoanHistoryUseCase {
    async execute(userId: string) {
      const loans = await prisma.loan.findMany({
        where: { userId },
        include: {
          bookCopy: {
            include: {
              book: true
            }
          }
        }
      });
  
      return loans;
    }
  }
  