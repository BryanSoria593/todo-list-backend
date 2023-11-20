import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Todo } from './schemas/todo.schema';
import { Model } from 'mongoose';
import { CreateTodoDto } from './dto/todo.dto';

@Injectable()
export class TodoService {
  constructor(
    @InjectModel(Todo.name) private readonly todoModel: Model<Todo>,
  ) {}

  async create(createTodoDto: CreateTodoDto): Promise<Todo> {
    const createdTodo = new this.todoModel(createTodoDto);
    const saveTodo = createdTodo.save({});
    return (await saveTodo).toObject({ versionKey: false });
  }

  async getAll() {
    return await this.todoModel.aggregate([
      {
        $lookup: {
          from: 'status',
          localField: 'statusId',
          foreignField: '_id',
          as: 'status',
        },
      },
      {
        $project: {
          title: 1,
          description: 1,
          status: { $arrayElemAt: ['$status', 0] },
        },
      },
    ]);
  }

  async updateTodo(id: string, createTodoDto: CreateTodoDto) {
    return await this.todoModel.findByIdAndUpdate(id, createTodoDto, {
      new: true,
    });
  }
  async updateStatus(id: string, statusId: number) {
    return await this.todoModel.findByIdAndUpdate(
      id,
      { statusId },
      { new: true },
    );
  }

  async deleteById(id: string) {
    return await this.todoModel.findByIdAndRemove(id);
  }
}
