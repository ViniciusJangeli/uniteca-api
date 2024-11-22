
import { NextFunction, Request, Response } from "express";
import { UpdatePassword } from "./UpdatePassword";

export class UpdatePasswordController {
  async handle(req: Request, res: Response, next: NextFunction) {
    const { userId, newPassword } = req.body;
    const useCase = new UpdatePassword();

    try {
      const result = await useCase.execute({ userId, newPassword });
      return res.status(200).json(result);
    } catch (error: any) {
      next(error);
    }
  }
}
