import { UserEntity } from "../../common/entitys/user.entity";
import { ResponseService } from "../../common/types/response.type";
import { repositoryUsers, UsersRepository } from "../../user/model/users.model";
import { LoginDto } from "../dto/login.dto";

export class AuthService {
  usersRepository: UsersRepository;
  authService: AuthService;
  userON: UserEntity | undefined;
  constructor() {
    this.userON = undefined;
    this.authService = new AuthService();
    this.usersRepository = repositoryUsers;
  }

  login(loginDto: LoginDto): ResponseService {
    const user: UserEntity | undefined = this.usersRepository.users.find(
      (value) =>
        value.email === loginDto.email && value.password === loginDto.password
    );

    if (!user) return { message: "Não foi possível logar", statusCode: 200 };

    this.userON = user;
    return { message: "Usuário logado", statusCode: 200 };
  }
}
