import { CurrentUser } from './../../common/decorators/current-user.decorator';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Task } from '@task/schemas/task.schema';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { CreateTaskDto } from '@task/dto/create-task.dto';
import { CurrentUserType } from '../user/interface/current-user.interface';
import { Tags } from '@tag/schema/tag.schema';
import { Lists } from '@list/schema/list.schema';
import { CreateTask } from './interface/create-task.interface';
import { GetTaskDto } from '@task/dto/get-task.dto';
import { UpdateTaskDto } from '@task/dto/update-task.dto';
import { DeleteTaskDto } from '@task/dto/delete-task.dto';
import { DeleteManyTaskDto } from './dto/delete-many-task';

@Injectable()
export class TaskService {
    constructor(
        @InjectModel('Task')
        private readonly taskModel: Model<Task>,
        @InjectModel('Tags')
        private readonly tagModel: Model<Tags>,
        @InjectModel('Lists')
        private readonly ListModel: Model<Lists>,
    ) { }

    async create(createTaskDto: CreateTaskDto, user: CurrentUserType): Promise<CreateTask> {
        const user_id = new mongoose.Types.ObjectId(user.id);
        if (createTaskDto?.tag_ids?.length) {
            const uniqueTagIds = [...new Set(createTaskDto.tag_ids)];
            if (uniqueTagIds.length !== createTaskDto.tag_ids.length) {
                throw new BadRequestException("Duplicate tag IDs are not allowed.");
            }
            const existingTags = await this.tagModel.find({
                _id: { $in: createTaskDto.tag_ids },
                user_id,
                is_deleted: false
            });
            if (existingTags.length !== createTaskDto.tag_ids.length) {
                throw new BadRequestException("Tag IDs are invalid or do not belong to the user.");
            }
        }
        if (createTaskDto.list_id) {
            const existingList = await this.ListModel.findOne({
                _id: createTaskDto.list_id,
                user_id,
                is_deleted: false
            });

            if (!existingList) {
                throw new BadRequestException("List does not exist or does not belong to the user.");
            }
        }

        const newTask = new Task();
        newTask.title = createTaskDto.title;
        newTask.description = createTaskDto.description;
        newTask.due_date = new Date(`${createTaskDto.due_date}T00:00:00.000Z`);
        newTask.user_id = user_id;
        newTask.tag_ids = createTaskDto?.tag_ids?.map((id: string) => new mongoose.Types.ObjectId(id)) || [];
        newTask.list_id = createTaskDto.list_id ? new mongoose.Types.ObjectId(createTaskDto.list_id) : null;
        const task = await this.taskModel.create(newTask);
        return { success: true, message: "Task created successfully.", data: task };
    }

    async findAll(@CurrentUser() user: CurrentUserType, getTaskDto: GetTaskDto): Promise<{ success: boolean, message: string, data: Task[] }> {
        const userId = new mongoose.Types.ObjectId(user.id)

        const tasks = await this.taskModel.aggregate([
            {
                $match: {
                    user_id: userId,
                    is_deleted: false,
                    due_date: {
                        $gte: new Date(getTaskDto.start_date),
                        $lt: new Date(getTaskDto.end_date)
                    }
                },
            },
            {
                $lookup: {
                    from: "tags",
                    localField: "tag_ids",
                    foreignField: "_id",
                    pipeline: [
                        {
                            $match: {
                                is_deleted: false
                            }
                        }
                    ],
                    as: "tags",
                }
            },
            {
                $lookup: {
                    from: "lists",
                    localField: "list_id",
                    foreignField: "_id",
                    pipeline: [
                        {
                            $match: {
                                is_deleted: false
                            }
                        }
                    ],
                    as: "list"
                },
            },
            {
                $set: {
                    list: { $ifNull: [{ $arrayElemAt: ["$list", 0] }, null] }
                }
            },
        ])
        return { success: true, message: "Tasks fetched successfully.", data: tasks };
    }

    async update(updateTaskDto: UpdateTaskDto, user: CurrentUserType): Promise<{ success: boolean, message: string, data: Task }> {
        const userId = new mongoose.Types.ObjectId(user.id);
        const updatedTask = await this.taskModel.findByIdAndUpdate(updateTaskDto.id, updateTaskDto, { new: true });
        const task = await this.taskModel.aggregate([
            {
                $match: {
                    _id: updatedTask._id,
                    user_id: userId,
                    is_deleted: false
                },
            },
            {
                $lookup: {
                    from: "tags",
                    localField: "tag_ids",
                    foreignField: "_id",
                    pipeline: [
                        {
                            $match: {
                                is_deleted: false
                            }
                        }
                    ],
                    as: "tags",
                }
            },
            {
                $lookup: {
                    from: "lists",
                    localField: "list_id",
                    foreignField: "_id",
                    pipeline: [
                        {
                            $match: {
                                is_deleted: false
                            }
                        }
                    ],
                    as: "list"
                },
            },
            {
                $set: {
                    list: { $ifNull: [{ $arrayElemAt: ["$list", 0] }, null] }
                }
            }
        ]);

        return { success: true, message: "Task Updated successfully.", data: task[0] };
    }

    async remove(deleteTaskDto: DeleteTaskDto, user: CurrentUserType): Promise<{ success: boolean, message: string }> {
        const userId = new mongoose.Types.ObjectId(user.id);
        const task = await this.taskModel.findOne({ _id: deleteTaskDto.id, user_id: userId, is_deleted: false });
        if (!task) {
            throw new NotFoundException("Task not found.");
        }
        await this.taskModel.findByIdAndUpdate(deleteTaskDto.id, { is_deleted: true });
        return { success: true, message: "Task Deleted successfully." }
    }

    async removemany(deleteManyTaskDto: DeleteManyTaskDto, user: CurrentUserType): Promise<{ success: boolean, message: string }> {
        const userId = new mongoose.Types.ObjectId(user.id);
        const isTasksExist = await this.taskModel.find({ user_id: userId, _id: deleteManyTaskDto.ids, is_deleted: false })
        if (isTasksExist.length === 0) {
            throw new NotFoundException("Tasks not found.");
        }
        await this.taskModel.updateMany({ _id: { $in: deleteManyTaskDto.ids }, user_id: userId },
            { $set: { is_deleted: true, deleteAt: new Date() } });
        return { success: true, message: "Tasks Deleted successfully." }
    }
}