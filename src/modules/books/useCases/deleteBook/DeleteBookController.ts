import { Request, Response } from "express";
import { DeleteBookUseCase } from "./DeleteBook";

export class DeleteBookController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.query;

    const useCase = new DeleteBookUseCase();

    try {
      await useCase.execute(id);
      return res.status(200).json({ message: "Book deleted successfully" });
    } catch (error) {
      return res.status(500).json({ error });
    }
  }
}
