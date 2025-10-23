import { ResponseService } from "../common/types/response.js";
import { CreateUserDto } from "./dtos/createUser.dto.js";
import { UserEntity } from "../common/entitys/user.entity.js";
import { repositoryUsers, UsersRepository } from "./model/users.model.js";
import { Response } from "express";

export class UsersService {
  private readonly usersRepository: UsersRepository;
  constructor() {
    this.usersRepository = repositoryUsers;
  }

  create(createUserDto: CreateUserDto, res: Response): ResponseService {
    const user: UserEntity = {
      id: this.usersRepository.id,
      name: createUserDto.name,
      email: createUserDto.email,
      password: createUserDto.password,
      age: createUserDto.age,
      account: undefined,
      createAt: new Date(),
      updateAt: new Date(),
    };

    this.usersRepository.users.push(user);
    this.usersRepository.id++;

    return { message: "Create", statusCode: 201, data: user };
  }

  findOne(id: number, res: Response): ResponseService {
    const user: UserEntity | undefined = this.usersRepository.users.find(
      (value) => value.id === id
    );

    if (user) {
      return { message: "ok", statusCode: 200, data: user };
    }

    return {
      message: "Usuário não encontrado",
      statusCode: 404,
      data: undefined,
    };
  }

  findAll(): ResponseService {
    const users: Array<UserEntity> = this.usersRepository.users;

    if (users.length > 1) {
      return {
        message: "OK",
        statusCode: 200,
        data: users,
      };
    }

    return {
      message: "Nenhum usuário encontrado",
      statusCode: 404,
      data: undefined,
    };
  }

  dellUser(id: number, res: Response): ResponseService {
    const user: ResponseService | unknown = this.findOne(id, res).data;

    if (user) {
      const indexUser: number = this.usersRepository.users.findIndex(
        (value) => value === user
      );
      this.usersRepository.users.splice(indexUser, 1);
      return { message: "Usuário deletado", statusCode: 204 };
    }

    return { message: "Error ao deletar o usuário", statusCode: 403 };
  }
}
