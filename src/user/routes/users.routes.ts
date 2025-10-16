import express from "express";
import { UsersController } from "../users.controller";

export const routes = express.Router();
const usersController: UsersController = new UsersController();

routes.get("/:id", usersController.findOne.bind(usersController));
routes.get("/", usersController.findAll.bind(usersController));
routes.post("/", usersController.create.bind(usersController));
routes.delete("/:id", usersController.dellUser.bind(usersController));
