import { Router } from "express";
import { CheckBookAvailabilityController } from "../modules/books/useCases/checkBook/CheckBookAvailabilityController";
import { CreateBookController } from "../modules/books/useCases/createBook/CreateBookController";
import { GetAllBooksController } from "../modules/books/useCases/getBook/allBooks/GetAllBooksController";
import { GetOneBookController } from "../modules/books/useCases/getBook/oneBook/GetOneBookController";
import { UpdateBookController } from "../modules/books/useCases/updateBook/UpdateBookController";
import { GetAvailableBooksController } from "../modules/books/useCases/availableBooks/AvailableBooksController";

const checkBookController = new CheckBookAvailabilityController();
const createBookController = new CreateBookController();
const getAllBooksController = new GetAllBooksController();
const getOneBookController = new GetOneBookController();
const updateBookController = new UpdateBookController();
const availableBooksController = new GetAvailableBooksController();

const livrosRoutes = Router();

livrosRoutes.post("/criar", async (req, res, next) => {
  await createBookController.handle(req, res, next);
});

livrosRoutes.get("/todos", async (req, res) => {
  await getAllBooksController.handle(req, res);
});

livrosRoutes.post("/disponibilidade", async (req, res, next) => {
  await checkBookController.handle(req, res, next);
});

livrosRoutes.get("/informacoes/:id", async (req, res) => {
  await getOneBookController.handle(req, res );
});

livrosRoutes.put("/atualizar/:id", async (req, res) => {
  await updateBookController.handle(req, res );
});

livrosRoutes.get("/disponiveis", async (req, res, next) => {
  await availableBooksController.handle(req, res, next );
});


export { livrosRoutes };
