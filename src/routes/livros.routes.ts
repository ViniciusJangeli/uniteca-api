import { NextFunction, Request, Response, Router } from "express";
import { CheckBookAvailabilityController } from "../modules/books/useCases/checkBook/CheckBookAvailabilityController";
import { CreateBookController } from "../modules/books/useCases/createBook/CreateBookController";
import { GetAllBooksController } from "../modules/books/useCases/getBook/allBooks/GetAllBooksController";
import { GetOneBookController } from "../modules/books/useCases/getBook/oneBook/GetOneBookController";
import { UpdateBookController } from "../modules/books/useCases/updateBook/UpdateBookController";

const checkBookController = new CheckBookAvailabilityController();
const createBookController = new CreateBookController();
const getAllBooksController = new GetAllBooksController();
const getOneBookController = new GetOneBookController()
const updateBookController = new UpdateBookController

const livrosRoutes = Router();

const asyncHandler = (fn: Function) => (req: any, res: any, next: any) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };

livrosRoutes.post("/criar", asyncHandler((req: Request, res: Response, next: NextFunction) => createBookController.handle(req, res, next)));
livrosRoutes.get("/todos", (req, res) => getAllBooksController.handle(req, res));
livrosRoutes.post("/disponibilidade", asyncHandler((req: Request, res: Response, next: NextFunction) => checkBookController.handle(req, res, next)));
livrosRoutes.get("/informacoes/:id", (req, res) => getOneBookController.handle(req, res));
livrosRoutes.put("/atualizar/:id", asyncHandler((req: Request, res: Response) => updateBookController.handle(req, res)));


export { livrosRoutes };
