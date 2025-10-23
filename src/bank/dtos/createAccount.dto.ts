import { UserEntity } from "../../common/entitys/user.entity";

export class CreateAccountDto {
  type!: "poupança" | "corrente";
  accountoOwner?: UserEntity;
}
