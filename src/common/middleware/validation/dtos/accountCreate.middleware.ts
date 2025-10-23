import { NextFunction, Request, Response } from "express";
import { CreateAccountDto } from "../../../../bank/dtos/createAccount.dto";

export class MiddlewareValidationAccountDto {
  validationDtoCreate(req: Request, res: Response, next: NextFunction) {
    const createDto: CreateAccountDto = req.body;

    if (!createDto.type) {
      res
        .status(403)
        .json({ message: "Tipo de conta não informado", statusCode: 403 });
    }

    if (createDto.type !== "poupança" && createDto.type !== "corrente") {
      res
        .status(403)
        .json({ message: "Tipo de conta inválido", statusCode: 403 });
    }

    next();
  }
}
