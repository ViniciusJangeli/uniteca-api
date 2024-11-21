import { NextFunction, Request, Response } from "express";
import { GetAllLoansUseCase } from "./GetAllLoans";

export class GetAllLoansController {
    async handle(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
      try {
        const useCase = new GetAllLoansUseCase();
        const loans = await useCase.execute();
  
        return res.status(200).json(loans);
      } catch (error) {
        next(error);
      }
    }
  }
  