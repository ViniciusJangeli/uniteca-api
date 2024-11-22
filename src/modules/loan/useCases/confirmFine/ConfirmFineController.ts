import { NextFunction, Request, Response } from "express";
import { ConfirmFinePaymentUseCase } from "./ConfirmFine";
import { ConfirmFinePaymentDTO } from "../../dtos/ConfirmPaymentFineDTO"; 

export class ConfirmFinePaymentController {
  async handle(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { emprestimoId } = req.params;
      const { valorPago } = req.body;

      const confirmFinePaymentDTO: ConfirmFinePaymentDTO = {
        emprestimoId,
        valorPago,
      };

      const useCase = new ConfirmFinePaymentUseCase();
      await useCase.execute(confirmFinePaymentDTO);

      return res.status(200).json({ message: 'Multa paga com sucesso!' });
    } catch (error) {
      next(error);
    }
  }
}
