import { NextFunction, Request, Response } from "express";
import { Login } from "./Login";

export class LoginController {
  async handle(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;
    const useCase = new Login();

    try {
      const result = await useCase.execute({ email, password });
      return res.status(200).json(result);
    } catch (error: any) {
      if (error.message === "Erro ao Autenticar") {
        return res.status(409).json({ message: error.message });
      }

      next(error);
    }
  }
}
