import jwt from "jsonwebtoken";
import { UserEntity } from "../common/entitys/user.entity";
import { ResponseService } from "../common/types/response.type";
import { repositoryUsers, UsersRepository } from "../user/model/users.model";
import { LoginDto } from "./dto/login.dto";
import { AuthJwt } from "./jwt/authJwt.service";

export class AuthService {
  usersRepository: UsersRepository;
  authJwt: AuthJwt;
  constructor() {
    this.authJwt = new AuthJwt();
    this.usersRepository = repositoryUsers;
  }

  login(loginDto: LoginDto): ResponseService {
    const user: UserEntity | undefined = this.usersRepository.users.find(
      (value) =>
        value.email === loginDto.email && value.password === loginDto.password
    );

    if (!user)
      return { message: "Usuário ou senha inválidos", statusCode: 400 };

    const token = this.authJwt.generateToken(user.name, user.id);
    return { message: "Usuário logado", statusCode: 200, data: token };
  }
}
