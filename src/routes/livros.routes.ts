import { Router } from "express";
import { CheckBookAvailabilityController } from "../modules/books/useCases/checkBook/CheckBookAvailabilityController";
import { CreateBookController } from "../modules/books/useCases/createBook/CreateBookController";
import { DeleteBookController } from "../modules/books/useCases/deleteBook/DeleteBookController";
import { UpdateBookController } from "../modules/books/useCases/updateBook/UpdateBookController";
import { GetAllBooksController } from "../modules/books/useCases/getBook/allBooks/GetAllBooksController";

const checkBookController = new CheckBookAvailabilityController();
const deleteBookController = new DeleteBookController();
const updateBookController = new UpdateBookController();
const createBookController = new CreateBookController();
const getAllBooksController = new GetAllBooksController();

const livrosRoutes = Router();

// Usando funções de callback para garantir o contexto correto
livrosRoutes.post("/criar", (req, res) => createBookController.handle(req, res));
livrosRoutes.get("/todos", (req, res) => getAllBooksController.handle(req, res));
// livrosRoutes.post("/update", (req, res) => updateBookController.handle(req, res));
// livrosRoutes.post("/delete", (req, res) => deleteBookController.handle(req, res));
// livrosRoutes.post("/check", (req, res) => checkBookController.handle(req, res));

export { livrosRoutes };
