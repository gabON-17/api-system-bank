import { AccountEntity } from "../common/entitys/account.entity";
import { UsersRepository, repositoryUsers } from "../user/model/users.model";
import { ResponseService } from "../common/types/response";
import { CreateAccountDto } from "./dtos/createAccount.dto";
import { BankRepository, repositoryBank } from "./model/bank.model";
import { PayloadUser } from "../common/types/payload";
import { UserEntity } from "../common/entitys/user.entity";

export class BankService {
  private readonly usersRepository: UsersRepository;
  private readonly bankRepository: BankRepository;
  constructor() {
    this.usersRepository = repositoryUsers;
    this.bankRepository = repositoryBank;
  }

  findAll(): ResponseService {
    const accounts: Array<AccountEntity> = this.bankRepository.accounts;

    if (accounts.length < 1) {
      return { message: "Contas não encontradas", statusCode: 404 };
    }

    return { message: "OK", statusCode: 200, data: accounts };
  }

  createAccount(
    createAccountDto: CreateAccountDto,
    payload: PayloadUser
  ): ResponseService {
    const user: UserEntity | undefined = this.usersRepository.findOne(
      payload.id
    );

    if (!user) return { message: "Error", statusCode: 500 };
    if (user.account != undefined)
      return { message: "Usuário já possui uma conta", statusCode: 403 };

    const accountDto: CreateAccountDto = {
      accountoOwner: user,
      type: createAccountDto.type,
    };

    const account: AccountEntity = this.bankRepository.create(accountDto);
    user.account = account.numberAccount;

    return { message: "Create", statusCode: 201, data: account };
  }

  deposit(idRecipient: number, value: number): ResponseService {
    const recipient = this.usersRepository.findOne(idRecipient);
    const accountRecipient: AccountEntity | undefined =
      this.bankRepository.findOne(recipient?.account!);

    if (!accountRecipient)
      return { message: "Conta inválida", statusCode: 403 };

    accountRecipient.money += value;
    return {
      message: "Ok",
      statusCode: 200,
      data: {
        name: accountRecipient.accountoOwner.name,
        saldo: accountRecipient.money,
      },
    };
  }

  transferer(
    numberAccountRecipient: number,
    value: number,
    payload: PayloadUser
  ): ResponseService {
    const userSender: UserEntity | undefined = this.usersRepository.findOne(
      payload.id
    );

    if (!userSender) return { message: "Dados incorretos", statusCode: 500 };

    const accountSender: AccountEntity | undefined =
      this.bankRepository.findOne(userSender!.account!);

    const accountRecipient: AccountEntity | undefined =
      this.bankRepository.findOne(numberAccountRecipient);

    if (!accountRecipient && !accountSender) {
      return { message: "Contas inválidas", statusCode: 403 };
    }

    if (accountSender!.money < value) {
      return { message: "Dinheiro insuficiente", statusCode: 403 };
    }

    accountSender!.money -= value;
    accountRecipient!.money += value;

    return {
      message: "Ok",
      statusCode: 200,
      data: {
        sender: userSender.name,
        recipient: accountRecipient?.accountoOwner.name,
        value: value,
        date: new Date(),
      },
    };
  }
}
