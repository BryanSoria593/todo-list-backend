import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Todo } from './schemas/todo.schema';
import { Model, Types } from 'mongoose';
import { CreateTodoDto, UpdateTodoDto } from './dto/todo.dto';

@Injectable()
export class TodoService {
  constructor(
    @InjectModel(Todo.name) private readonly todoModel: Model<Todo>,
  ) {}

  async create(createTodoDto: CreateTodoDto) {
    const todo = new this.todoModel(createTodoDto);
    const todoSaved = await todo.save();
    const todoWithStatus = await this.findByIdWithStatus(todoSaved._id);
    return todoWithStatus[0];
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

  async updateTodo(id: string, updateTodo: UpdateTodoDto) {
    const updatedTodo = await this.todoModel.findByIdAndUpdate(id, updateTodo, {
      new: true,
    });

    const todoWithStatus = await this.findByIdWithStatus(updatedTodo._id);

    return todoWithStatus[0];
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

  async findByIdWithStatus(id: Types.ObjectId) {
    return await this.todoModel.aggregate([
      {
        $match: { _id: id },
      },
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
}
