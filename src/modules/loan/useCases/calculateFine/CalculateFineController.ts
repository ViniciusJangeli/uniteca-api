import { NextFunction, Request, Response } from "express";
import { CalculateFineUseCase } from "./CalculateFine";

export class CalculateFineController {
    async handle(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
      try {
        const { emprestimoId, valorPorDia } = req.body;
  
        const useCase = new CalculateFineUseCase();
        const result = await useCase.execute({
          emprestimoId,
          valorPorDia: parseFloat(valorPorDia),
        });
  
        return res.status(200).json(result);
      } catch (error) {
        next(error);
      }
    }
  }
  