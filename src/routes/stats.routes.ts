import { Router } from "express";
import { GetLibraryStatsController } from "../modules/stats/libraryStats/LibraryStatsController";

const statsRoutes = Router();

const getLibraryStatsController = new GetLibraryStatsController();

statsRoutes.get("/informacoes", async (req, res, next) => {
    await getLibraryStatsController.handle(req, res, next);
  });

export default statsRoutes;
