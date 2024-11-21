import { Request, Response, NextFunction } from "express";
import { ReturnLoanUseCase } from "./ReturnLoan";

export class ReturnLoanController {
  async handle(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { emprestimoId, dataDevolucao, valorMulta } = req.body;
      
      const useCase = new ReturnLoanUseCase();
      const result = await useCase.execute({
        emprestimoId,
        valorMulta,
        dataDevolucao: new Date(dataDevolucao),
      });

      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}
