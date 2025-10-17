import { Request, Response } from "express";
import { UsersService } from "./users.service";
import { ResponseService } from "../common/types/response.type";

export class UsersController {
  usersService: UsersService;
  constructor() {
    this.usersService = new UsersService();
  }

  create(req: Request, res: Response) {
    const dataService: ResponseService = this.usersService.create(
      req.body,
      res
    );
    res
      .status(dataService.statusCode)
      .json({ message: dataService.message, data: dataService.data });
  }

  findOne(req: Request, res: Response) {
    const dataService: ResponseService = this.usersService.findOne(
      +req.params.id,
      res
    );
    res
      .status(dataService.statusCode)
      .json({ message: dataService.message, dataService: dataService.data });
  }

  findAll(req: Request, res: Response) {
    const dataService: ResponseService = this.usersService.findAll();
    res
      .status(dataService.statusCode)
      .json({ message: dataService.message, data: dataService.data });
  }

  dellUser(req: Request, res: Response) {
    const dataService: ResponseService = this.usersService.dellUser(
      +req.params.id,
      res
    );
    res.status(dataService.statusCode).json(dataService.message);
  }
}
