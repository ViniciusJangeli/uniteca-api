import { NextFunction, Request, Response } from "express";
import { EditFineUseCase } from "./EditeFine";

export class EditFineController {
    async handle(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
      try {
        const { multaId, status } = req.body;
  
        const useCase = new EditFineUseCase();
        const result = await useCase.execute({ multaId, status });
  
        return res.status(200).json(result);
      } catch (error) {
        next(error);
      }
    }
  }
  