export class UserEntity {
  id!: number;
  name!: string;
  email!: string;
  password!: string;
  age!: number;
  account!: number | null;
  createAt!: Date;
  updateAt!: Date;
}
