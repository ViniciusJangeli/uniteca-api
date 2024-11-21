import { NextFunction, Request, Response } from "express";
import { GetUserLoansUseCase } from "./GetUniqueLoan";

export class GetUserLoansController {
  async handle(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { usuarioId } = req.params;

      const useCase = new GetUserLoansUseCase();
      const loans = await useCase.execute({ usuarioId });

      return res.status(200).json(loans);
    } catch (error) {
      next(error);
    }
  }
}
