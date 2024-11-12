import { Request, Response } from "express";
import { CreateBookUseCase } from "./CreateBook";

export class CreateBookController {
  async handle(req: Request, res: Response) {
    const { title, author, year, edition, publisher, volume, isbn, totalPages, totalCopies } = req.body;

    const useCase = new CreateBookUseCase();
    const result = await useCase.execute({ title, author, year, edition, publisher, volume, isbn, totalPages, totalCopies });

    return res.status(201).json(result);
  }
}
