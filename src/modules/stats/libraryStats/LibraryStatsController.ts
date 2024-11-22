import { NextFunction, Request, Response } from "express";
import { GetLibraryStatsUseCase } from "./LibraryStats";

export class GetLibraryStatsController {
  async handle(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const useCase = new GetLibraryStatsUseCase();
      const stats = await useCase.execute();

      return res.status(200).json(stats);
    } catch (error) {
      next(error);
    }
  }
}
