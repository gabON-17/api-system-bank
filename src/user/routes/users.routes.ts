import express from "express";
import { UsersController } from "../users.controller";
import { MiddlewareValidationUsersDTO } from "../../common/middleware/validationDtos/users.middleware";
import { MiddlewareJwtToken } from "../../common/middleware/middlewaresJwt/jwt.middleware";

export const routesUsers = express.Router();

const middlewareUsers = new MiddlewareValidationUsersDTO();
const middlewareJwt = new MiddlewareJwtToken();

const usersController: UsersController = new UsersController();

routesUsers.get(
  "/:id",
  middlewareJwt.verifyToken.bind(middlewareJwt),
  usersController.findOne.bind(usersController)
);

routesUsers.get("/", usersController.findAll.bind(usersController));

routesUsers.post(
  "/",
  middlewareUsers.verifyDtoCreate.bind(middlewareUsers),
  usersController.create.bind(usersController)
);

routesUsers.delete("/:id", usersController.dellUser.bind(usersController));
