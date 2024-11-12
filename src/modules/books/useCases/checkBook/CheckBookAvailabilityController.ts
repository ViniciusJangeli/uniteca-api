import { Request, Response } from "express";
import { CheckBookAvailabilityUseCase } from "./CheckBookAvailability";

export class CheckBookAvailabilityController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { bookId } = req.params;
    const useCase = new CheckBookAvailabilityUseCase();

    try {
      const isAvailable = await useCase.execute(bookId);
      return res.status(200).json({ isAvailable });
    } catch (error) {
      return res.status(500).json({ error });
    }
  }
}
