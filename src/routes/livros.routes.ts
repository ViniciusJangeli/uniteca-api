import { Router } from "express";
import { CheckBookAvailabilityController } from "../modules/books/useCases/checkBook/CheckBookAvailabilityController";
import { CreateBookController } from "../modules/books/useCases/createBook/CreateBookController";
import { DeleteBookController } from "../modules/books/useCases/deleteBook/DeleteBookController";
import { UpdateBookController } from "../modules/books/useCases/updateBook/UpdateBookController";

const checkBookController = new CheckBookAvailabilityController();
const deleteBookController = new DeleteBookController();
const updateBookController = new UpdateBookController();
const createBookController = new CreateBookController();


const livrosRoutes = Router();

livrosRoutes.post("/criar", createBookController.handle);
// livrosRoutes.post("/update", updateBookController.handle);
// livrosRoutes.post("/delete", deleteBookController.handle);
// livrosRoutes.post("/check", checkBookController.handle);

export { livrosRoutes };
