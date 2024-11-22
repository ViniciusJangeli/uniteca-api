import { NextFunction, Request, Response } from "express";
import { GetLoanDetailsUseCase } from "./GetLoanDetails";

export class GetLoanDetailsController {
  async handle(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { emprestimoId } = req.params;

      const useCase = new GetLoanDetailsUseCase();
      const loanDetails = await useCase.execute({ emprestimoId });

      if (!loanDetails) {
        return res.status(404).json({ error: "Empréstimo não encontrado" });
      }

      return res.status(200).json(loanDetails);
    } catch (error) {
      next(error);
    }
  }
}
