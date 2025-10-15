import { UserEntity } from "../../common/entitys/user.entity";

export class UsersRepository {
  id: number;
  users: Array<UserEntity>;
  constructor() {
    this.id = 0;
    this.users = [];
  }
}

export const repositoryUsers = new UsersRepository();
