import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TodoService } from './todo.sevice';
import { CreateTodoDto, UpdateTodoDto } from './dto/todo.dto';

@Controller('api/todo')
export class TodoController {
  constructor(private todoService: TodoService) {}

  @Get('getAll')
  async getTodos() {
    return await this.todoService.getAll();
  }

  @Post('create')
  createTodo(@Body() createTodoDto: CreateTodoDto) {
    return this.todoService.create(createTodoDto);
  }

  @Put('update/:id')
  updateTodo(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    return this.todoService.updateTodo(id, updateTodoDto);
  }
  @Put('update-status/:id')
  updateStatus(@Param('id') id: string, @Body('statusId') statusId: number) {
    return this.todoService.updateStatus(id, statusId);
  }

  @Delete('delete/:id')
  deleteById(@Param('id') id: string) {
    return this.todoService.deleteById(id);
  }
}
