import { Request, Response } from "express";
import { UserLoanHistoryUseCase } from "./UserLoanHistory";

export class UserLoanHistoryController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { userId } = req.params;
    const useCase = new UserLoanHistoryUseCase();

    try {
      const loans = await useCase.execute(userId);
      return res.status(200).json(loans);
    } catch (error) {
      return res.status(500).json({ error });
    }
  }
}
