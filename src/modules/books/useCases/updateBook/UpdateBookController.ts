import { Request, Response } from "express";
import { UpdateBookUseCase } from "./UpdateBook";
import { UpdateBookDTO } from "../../dtos/UpdateBookDTO";

export class UpdateBookController {
  private updateBookUseCase: UpdateBookUseCase;

  constructor() {
    this.updateBookUseCase = new UpdateBookUseCase();
  }

  async handle(req: Request, res: Response): Promise<Response> {
    const data: UpdateBookDTO = req.body;

    const {
      id,
      titulo,
      autor,
      ano,
      edicao,
      editora,
      volume,
      isbn,
      totalPaginas,
      totalExemplares,
      livro
    } = data;

    const updatedData = {
      id: id,
      titulo: titulo,
      autor: autor,
      isbn: isbn,
      ano: parseInt(ano.toString()),
      edicao: parseInt(edicao.toString()),
      volume: parseInt(volume.toString()),
      editora: editora,
      totalPaginas: parseInt(totalPaginas.toString()),
      totalExemplares: parseInt(totalExemplares.toString()),
      livro
    }

    try {
      const updatedBook = await this.updateBookUseCase.execute(updatedData);
      return res.status(200).json({
        message: "Livro atualizado com sucesso!",
        updatedBook,
      });
    } catch (error) {
      return res.status(500).json({ error: "Erro ao atualizar livro" });
    }
  }
}
