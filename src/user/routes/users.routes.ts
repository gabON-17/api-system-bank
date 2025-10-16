import express from "express";
import { UsersController } from "../users.controller";
import { MiddlewareValidationUsersDTO } from "../../common/middleware/validationDtos/users.middleware";

export const routes = express.Router();
const middlewareUsers = new MiddlewareValidationUsersDTO();
const usersController: UsersController = new UsersController();

routes.get("/:id", usersController.findOne.bind(usersController));
routes.get("/", usersController.findAll.bind(usersController));
routes.post(
  "/",
  middlewareUsers.verifyDtoCreate.bind(middlewareUsers),
  usersController.create.bind(usersController)
);
routes.delete("/:id", usersController.dellUser.bind(usersController));
