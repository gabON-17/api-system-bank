import express, { Router } from "express";
import { UsersController } from "../user/users.controller";
import { MiddlewareValidationUsersDTO } from "../common/middleware/validation/dtos/usersCreate.middleware";
import { MiddlewareJwtToken } from "../common/middleware/middlewaresJwt/jwt.middleware";
import { MiddlewareEmailDuplicate } from "../common/middleware/validation/verifyEmail.middleware";

export const routesUsers: Router = express.Router();

const middlewareUsersDto: MiddlewareValidationUsersDTO =
  new MiddlewareValidationUsersDTO();

const middlewareEmailDuplicate: MiddlewareEmailDuplicate =
  new MiddlewareEmailDuplicate();

const middlewareJwt: MiddlewareJwtToken = new MiddlewareJwtToken();

const usersController: UsersController = new UsersController();

routesUsers.get(
  "/:id",
  middlewareJwt.verifyToken.bind(middlewareJwt),
  usersController.findOne.bind(usersController)
);

routesUsers.get("/", usersController.findAll.bind(usersController));

routesUsers.post(
  "/",
  middlewareEmailDuplicate.verifyEmail.bind(middlewareEmailDuplicate),
  middlewareUsersDto.verifyDtoCreate.bind(middlewareUsersDto),
  usersController.create.bind(usersController)
);

routesUsers.delete("/:id", usersController.dellUser.bind(usersController));
