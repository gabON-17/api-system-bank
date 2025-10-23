import { Router } from "express";
import { BankController } from "../bank/bank.controller";
import { MiddlewareJwtToken } from "../common/middleware/middlewaresJwt/jwt.middleware";
import { MiddlewareValidationAccountDto } from "../common/middleware/validation/dtos/accountCreate.middleware";

export const routesBank: Router = Router();
const bankController: BankController = new BankController();

const middlewareValidationAccountDto: MiddlewareValidationAccountDto =
  new MiddlewareValidationAccountDto();

const middlewareJwtToken: MiddlewareJwtToken = new MiddlewareJwtToken();

routesBank.get(
  "/",
  middlewareJwtToken.verifyToken.bind(middlewareJwtToken),
  bankController.getAccounts.bind(bankController)
);

routesBank.post(
  "/create",
  middlewareValidationAccountDto.validationDtoCreate.bind(
    middlewareValidationAccountDto
  ),
  middlewareJwtToken.verifyToken.bind(middlewareJwtToken),
  bankController.createAccount.bind(bankController)
);

routesBank.post(
  "/deposit",
  middlewareJwtToken.verifyToken.bind(middlewareJwtToken),
  bankController.deposit.bind(bankController)
);

routesBank.post(
  "/transfer",
  middlewareJwtToken.verifyToken.bind(middlewareJwtToken),
  bankController.transfer.bind(bankController)
);
