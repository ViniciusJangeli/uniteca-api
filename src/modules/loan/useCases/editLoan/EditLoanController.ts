import { Request, Response, NextFunction } from "express";
import { EditLoanUseCase } from "./EditLoan";

export class EditLoanController {
    async handle(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
      try {
        const { emprestimoId, dataDevolucaoPrevista, status } = req.body;
  
        const useCase = new EditLoanUseCase();
        const result = await useCase.execute({
          emprestimoId,
          dataDevolucaoPrevista: dataDevolucaoPrevista ? new Date(dataDevolucaoPrevista) : undefined,
          status,
        });
  
        return res.status(200).json(result);
      } catch (error) {
        next(error);
      }
    }
  }
  