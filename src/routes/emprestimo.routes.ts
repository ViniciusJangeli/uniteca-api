import { Router } from "express";
import { CreateLoanController } from "../modules/loan/useCases/createLoan/CreateLoanController"; 
import { ReturnLoanController } from "../modules/loan/useCases/returnLoan/ReturnLoanController"; 
import { EditLoanController } from "../modules/loan/useCases/editLoan/EditLoanController"; 
import { CalculateFineController } from "../modules/loan/useCases/calculateFine/CalculateFineController"; 
import { EditFineController } from "../modules/loan/useCases/editFine/EditeFineController"; 
import { GetAllLoansController } from "../modules/loan/useCases/GetAllLoans/GetAllLoansController"; 
import { GetUserLoansController } from "../modules/loan/useCases/GetUniqueLoan/GetUniqueLoanController"; 
import { GetLoanDetailsController } from "../modules/loan/useCases/getLoanDetails/GetLoanDetailsController";
import { ConfirmFinePaymentController } from "../modules/loan/useCases/confirmFine/ConfirmFineController";

const createLoanController = new CreateLoanController();
const returnLoanController = new ReturnLoanController();
const editLoanController = new EditLoanController();
const calculateFineController = new CalculateFineController();
const editFineController = new EditFineController();
const getAllLoansController = new GetAllLoansController();
const getUserLoansController = new GetUserLoansController();
const getLoanDetailsController = new GetLoanDetailsController();
const confirmFinePaymentController = new ConfirmFinePaymentController();

const emprestimoRoutes = Router();

emprestimoRoutes.post("/criar", async (req, res, next) => {
  await createLoanController.handle(req, res, next);
});

emprestimoRoutes.post("/devolucao", async (req, res, next) => {
  await returnLoanController.handle(req, res, next);
});

emprestimoRoutes.put("/editar", async (req, res, next) => {
  await editLoanController.handle(req, res, next);
});

emprestimoRoutes.post("/calcular-multa", async (req, res, next) => {
  await calculateFineController.handle(req, res, next);
});

emprestimoRoutes.put("/editar-multa", async (req, res, next) => {
  await editFineController.handle(req, res, next);
});

emprestimoRoutes.get("/todos", async (req, res, next) => {
  await getAllLoansController.handle(req, res, next);
});

emprestimoRoutes.get("/usuario/:usuarioId", async (req, res, next) => {
  await getUserLoansController.handle(req, res, next);
});

emprestimoRoutes.get("/detalhes/:emprestimoId", async (req, res, next) => {
  await getLoanDetailsController.handle(req, res, next);
});

emprestimoRoutes.post("/multa/pagar/:emprestimoId", async (req, res, next) => {
  await confirmFinePaymentController.handle(req, res, next);
});

export { emprestimoRoutes };
