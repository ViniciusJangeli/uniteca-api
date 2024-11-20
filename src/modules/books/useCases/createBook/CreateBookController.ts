import { NextFunction, Request, Response } from "express";
import { CreateBookUseCase } from "./CreateBook";

export class CreateBookController {
  async handle(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const {
        titulo,
        autor,
        ano,
        edicao,
        editora,
        volume,
        isbn,
        totalPaginas,
        totalExemplares,
      } = req.body;

      const criadoPorId = "c77ea826-48e6-4b5b-9be9-61d7bf54f5d8";

      const useCase = new CreateBookUseCase();
      const result = await useCase.execute({
        titulo,
        autor,
        ano: parseInt(ano),
        edicao: parseInt(edicao),
        editora,
        volume: parseInt(volume),
        isbn,
        totalPaginas: parseInt(totalPaginas),
        totalExemplares: parseInt(totalExemplares),
        criadoPorId,
      });

      return res.status(201).json(result);
    } catch (error: any) {
      if (error.message === "Livro já existe!") {
        return res.status(409).json({ message: error.message });
      }

      next(error);
    }
  }
}
