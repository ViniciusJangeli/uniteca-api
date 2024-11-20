import { GetOneBookUseCase } from "./GetOneBook";
import { Request, Response } from "express";

export class GetOneBookController {
  private getBookByIdUseCase: GetOneBookUseCase;

  constructor() {
    this.getBookByIdUseCase = new GetOneBookUseCase();
  }

  async handle(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    try {
      const livro = await this.getBookByIdUseCase.execute(id);
      if (!livro) {
        res.status(404).json({ message: "Livro não encontrado" });
      } else {
        res.status(200).json(livro);
      }
    } catch (error) {
      res.status(500).json({ message: "Erro ao obter livro" });
    }
  }
}
