import { GetAllBooksUseCase } from "./GetAllBooks";
import { NextFunction, Request, Response } from "express";

export class GetAllBooksController {
    private getAllBooksUseCase: GetAllBooksUseCase;
  
    constructor() {
      this.getAllBooksUseCase = new GetAllBooksUseCase();
    }
  
    async handle(req: Request, res: Response): Promise<void> {
      try {

        const livros = await this.getAllBooksUseCase.execute();
        res.status(200).json(livros);
      } catch (error) {
        res.status(500).json({ message: "Erro ao buscar livros"});
      }
    }
  }