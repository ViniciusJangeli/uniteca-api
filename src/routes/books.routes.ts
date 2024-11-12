import { Router } from "express";
import { CheckBookAvailabilityController } from "../modules/books/useCases/checkBook/CheckBookAvailabilityController";
import { CreateBookController } from "../modules/books/useCases/createBook/CreateBookController";
import { DeleteBookController } from "../modules/books/useCases/deleteBook/DeleteBookController";
import { UpdateBookController } from "../modules/books/useCases/updateBook/UpdateBookController";

const checkBookController = new CheckBookAvailabilityController();
const createBookController = new CreateBookController();
const deleteBookController = new DeleteBookController();
const updateBookController = new UpdateBookController();


const booksRoutes = Router();

booksRoutes.post("/create", createBookController.handle);
booksRoutes.post("/update", updateBookController.handle);
booksRoutes.post("/delete", deleteBookController.handle);
booksRoutes.post("/check", checkBookController.handle);

export { booksRoutes };
