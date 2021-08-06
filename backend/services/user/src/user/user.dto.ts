export class CreateUserDto {
  name: string;
  email: string;
  password: string;
  createdAt: number;
  updatedAt: number;
}

export class UpdateUserDto {
  name: string;
  email: string;
  password: string;
  updatedAt: number;
}
