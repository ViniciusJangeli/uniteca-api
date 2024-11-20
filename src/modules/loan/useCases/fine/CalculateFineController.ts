import { Request, Response } from "express";
import { prisma } from "../../../../prisma/client";

export class CalculateFineController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { loanId } = req.params;
    const finePerDay = 1; 

    try {
      const loan = await prisma.loan.findUnique({
        where: { id: loanId },
        include: { bookCopy: true }
      });

      if (!loan || !loan.returnDate) {
        return res.status(400).json({ error: "Loan not found or not returned yet" });
      }

      const today = new Date();
      const overdueDays = Math.floor((today.getTime() - new Date(loan.returnDate).getTime()) / (1000 * 3600 * 24));

      if (overdueDays <= 0) {
        return res.status(200).json({ fine: 0 });
      }

      const fine = overdueDays * finePerDay;
      return res.status(200).json({ fine });
    } catch (error) {
      return res.status(500).json({ error });
    }
  }
}
