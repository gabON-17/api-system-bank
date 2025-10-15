import { NextFunction, Request, Response } from "express";
import { CreateUserDto } from "../../../user/dtos/createUser.dto";
import { isEmail, isNumber, isString, isStrongPassword } from "class-validator";

export class MiddlewareValidationUsersDTO {
  verifyDtoCreate(req: Request, res: Response, next: NextFunction) {
    const createDto: CreateUserDto = req.body;

    if (Object.keys(createDto).length < 4) {
      return res.status(400).json({
        message: "Falta de dados para concluir cadastro",
        statusCode: 400,
      });
    }

    if (
      !this.vefiryName(createDto.name) ||
      !this.vefiryEmail(createDto.email) ||
      !this.verifyPassword(createDto.password) ||
      !this.verifyAge(createDto.age)
    ) {
      return res
        .status(400)
        .json({ message: "Dados enviados incorretos", statusCode: 400 });
    }

    next();
  }

  vefiryName(name: unknown): boolean {
    if (isString(name)) return true;

    return false;
  }

  vefiryEmail(email: unknown): boolean {
    if (isEmail(email)) return true;

    return false;
  }

  verifyPassword(password: unknown): boolean {
    if (
      isStrongPassword(password, {
        minLength: 8,
        minLowercase: 1,
        minNumbers: 1,
        minUppercase: 1,
        minSymbols: 0,
      })
    ) {
      return true;
    }
    return false;
  }

  verifyAge(age: unknown): boolean {
    if (isNumber(age)) return true;

    return false;
  }
}
