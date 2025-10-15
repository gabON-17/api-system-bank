import { AccountEntity } from "../../common/entitys/account.entity";
import { UsersRepository, repositoryUsers } from "../../user/model/users.model";
import { CreateAccountDto } from "../dtos/createAccount.dto";

export class BankService {
  usersRepository: UsersRepository;
  constructor() {
    this.usersRepository = repositoryUsers;
  }

  create(createAccountDto: CreateAccountDto) {
    const account: AccountEntity | undefined = undefined;
  }
}
