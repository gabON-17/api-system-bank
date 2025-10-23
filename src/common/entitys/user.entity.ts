import { AccountEntity } from "./account.entity";

export class UserEntity {
  id!: number;
  name!: string;
  email!: string;
  password!: string;
  age!: number;
  account!: number | undefined;
  createAt!: Date;
  updateAt!: Date;
}
