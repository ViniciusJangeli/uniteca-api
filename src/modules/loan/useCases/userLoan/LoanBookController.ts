import { Request, Response } from "express";
import { LoanBookUseCase } from "./LoanBook";
import { LoanDTO } from "../../dtos/LoanDTO";

export class LoanBookController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { userId, bookCopyId, loanDate, expectedReturnDate }: LoanDTO = req.body;
    const useCase = new LoanBookUseCase();

    try {
      const loan = await useCase.execute({ userId, bookCopyId, loanDate, expectedReturnDate });
      return res.status(201).json(loan);
    } catch (error) {
      return res.status(500).json({ error });
    }
  }
}
