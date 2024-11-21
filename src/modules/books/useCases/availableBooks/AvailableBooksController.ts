import { NextFunction, Request, Response } from "express";
import { GetAvailableBooksUseCase } from "./AvailableBooks";

export class GetAvailableBooksController {
  async handle(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const useCase = new GetAvailableBooksUseCase();
      const { livrosDisponiveis } = await useCase.execute();

      if (livrosDisponiveis.length > 0) {
        return res.status(200).json({
          message: "Livros disponíveis para empréstimo.",
          livros: livrosDisponiveis,
        });
      } else {
        return res.status(400).json({
          message: "Nenhum livro disponível para empréstimo no momento.",
        });
      }
    } catch (error: any) {
      next(error);
    }
  }
}
