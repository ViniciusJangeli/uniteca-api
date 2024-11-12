import { Request, Response } from "express";
import { UpdateBookUseCase } from "./UpdateBook";
import { UpdateBookDTO } from "../../dtos/UpdateBookDTO";

export class UpdateBookController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const data: UpdateBookDTO = req.body; 

    const updatedData = { id, ...data };

    const useCase = new UpdateBookUseCase();

    try {

      const updatedBook = await useCase.execute(updatedData);
      return res.status(200).json(updatedBook);
    } catch (error) {
      return res.status(500).json({ error });
    }
  }
}
