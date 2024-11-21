import { Request, Response, NextFunction } from "express";
import { CreateLoanUseCase } from "./CreateLoan";

export class CreateLoanController {
  async handle(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { usuarioId, livroId, dataDevolucao, dataEmprestimo } = req.body;

      const useCase = new CreateLoanUseCase();
      const result = await useCase.execute({
        usuarioId,
        livroId,
        dataEmprestimo: new Date(dataEmprestimo),
        dataDevolucaoPrevista: new Date(dataDevolucao),
      });

      return res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }
}
