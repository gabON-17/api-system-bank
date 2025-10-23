import { UserEntity } from "../../common/entitys/user.entity";

export class UsersRepository {
  id: number;
  users: Array<UserEntity>;
  constructor() {
    this.id = 0;
    this.users = [];
  }

  findAll(): Array<UserEntity> | undefined {
    const users: Array<UserEntity> = this.users;
    if (users.length < 1) return undefined;

    return users;
  }

  findOne(id: number): UserEntity | undefined {
    const account: UserEntity | undefined = this.users.find(
      (value) => value.id === id
    );

    return account;
  }

  create(account: UserEntity): void {
    this.users.push(account);
  }
}

export const repositoryUsers = new UsersRepository();
