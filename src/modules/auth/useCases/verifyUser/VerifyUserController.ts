import { NextFunction, Request, Response } from "express";
import { VerifyEmailCpf } from "./VerifyUser";

export class VerifyEmailCpfController {
  async handle(req: Request, res: Response, next: NextFunction) {
    const { email, cpf } = req.body;
    const useCase = new VerifyEmailCpf();

    try {
      const result = await useCase.execute({ email, cpf });
      return res.status(200).json(result);
    } catch (error: any) {
      if (error.message === "Email ou CPF inválidos.") {
        return res.status(409).json({ message: error.message });
      }

      next(error);
    }
  }
}
