import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateTodoDto {
  @IsNotEmpty({ message: 'El título es requerido' })
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsNotEmpty({ message: 'El status es requerido' })
  @IsNumber()
  statusId: number;
}

export class UpdateTodoDto {
  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsNumber()
  statusId: number;
}

export class ResponseCreateTodoDto {
  id: string;
  title: string;
  description: string;
  status: {
    _id: number;
    name: string;
  };
  createdAt: Date;
  updatedAt: Date;
}
