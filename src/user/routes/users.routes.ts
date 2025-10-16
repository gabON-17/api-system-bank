import express from "express";
import { UsersController } from "../users.controller";
import { MiddlewareValidationUsersDTO } from "../../common/middleware/validationDtos/users.middleware";

export const routesUsers = express.Router();
const middlewareUsers = new MiddlewareValidationUsersDTO();
const usersController: UsersController = new UsersController();

routesUsers.get("/:id", usersController.findOne.bind(usersController));
routesUsers.get("/", usersController.findAll.bind(usersController));
routesUsers.post(
  "/",
  middlewareUsers.verifyDtoCreate.bind(middlewareUsers),
  usersController.create.bind(usersController)
);
routesUsers.delete("/:id", usersController.dellUser.bind(usersController));
