import { AccountEntity } from "../../common/entitys/account.entity";
import { customAlphabet } from "nanoid";
import { CreateAccountDto } from "../dtos/createAccount.dto";

export class BankRepository {
  accounts: Array<AccountEntity>;
  constructor() {
    this.accounts = [];
  }

  findAll(): Array<AccountEntity> | undefined {
    const accounts: Array<AccountEntity> = this.accounts;
    if (accounts.length < 1) return undefined;

    return accounts;
  }

  findOne(numberAccount: number): AccountEntity | undefined {
    const account: AccountEntity | undefined = this.accounts.find(
      (value) => value.numberAccount === numberAccount
    );

    return account;
  }

  create(account: CreateAccountDto): AccountEntity {
    const generateId: Function = customAlphabet("0123456789", 5);
    const uuid: number = Number(generateId(5));

    const newAccount: AccountEntity = {
      numberAccount: uuid,
      accountoOwner: account.accountoOwner!,
      type: account.type,
      money: 0,
      createAt: new Date(),
      updateAt: new Date(),
    };

    this.accounts.push(newAccount);
    return newAccount;
  }
}

export const repositoryBank: BankRepository = new BankRepository();
