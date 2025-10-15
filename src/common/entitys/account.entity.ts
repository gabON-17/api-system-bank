import { UserEntity } from "./user.entity";

export class AccountEntity {
  accountoOwner!: UserEntity;
  numberAccount!: number;
  type!: "corrente" | "poupança";
  money!: number;
}
