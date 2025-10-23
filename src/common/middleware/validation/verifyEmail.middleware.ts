import { NextFunction, Request, Response } from "express";
import {
  repositoryUsers,
  UsersRepository,
} from "../../../user/model/users.model";
import { UserEntity } from "../../entitys/user.entity";

export class MiddlewareEmailDuplicate {
  private readonly usersRepository: UsersRepository;
  constructor() {
    this.usersRepository = repositoryUsers;
  }

  verifyEmail(req: Request, res: Response, next: NextFunction) {
    const email: string | null = req.body.email;
    if (!email) next();

    const users: Array<UserEntity> | undefined = this.usersRepository.findAll();
    if (!users) {
      next();
      return;
    }

    const usersDuplicate = users.find((value) => value.email === email);
    if (!usersDuplicate) next();

    res.status(403).json({ message: "Email já cadastrado", statusCode: 403 });
  }
}
