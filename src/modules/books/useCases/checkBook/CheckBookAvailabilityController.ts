import { NextFunction, Request, Response } from "express";
import { CheckBookAvailabilityUseCase } from "./CheckBookAvailability";

export class CheckBookAvailabilityController {
  private checkBookAvailabilityUseCase: CheckBookAvailabilityUseCase;

  constructor() {
    this.checkBookAvailabilityUseCase = new CheckBookAvailabilityUseCase();
  }

  async handle(req: Request, res: Response, next: NextFunction): Promise<Response | void> {  // Alterado para Promise<Response | void>
    const livroId = req.query.livroId as string | undefined;
  
    if (!livroId || typeof livroId !== 'string') {
      return res.status(400).json({ error: 'livroId é obrigatório e deve ser uma string válida.' });
    }
  
    try {
      const disponibilidade = await this.checkBookAvailabilityUseCase.execute(livroId);
      return res.status(200).json(disponibilidade);  // Retorno explícito da resposta
    } catch (error) {
      next(error);
    }

    // Garantir que o método sempre retorne algo, mesmo que seja um `void`
  }
}
