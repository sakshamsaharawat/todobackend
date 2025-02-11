import { GetTask } from './interface/get-task.interface';
import { CurrentUser } from './../../common/decorators/current-user.decorator';
import { BadRequestException, Injectable, Type } from '@nestjs/common';
import { Task } from './schemas/task.schema';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { CreateTaskDto } from './dto/create-task.dto';
import { CurrentUserType } from '../user/interface/current-user.interface';
import { Tags } from '../tag/schema/tag.schema';
import { Lists } from '../list/schema/list.schema';
import { CreateTask } from './interface/create-task.interface';
import { GetTaskDto } from './dto/get-task.dto';

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

        const uniqueTagIds = [...new Set(createTaskDto.tag_ids)];
        if (uniqueTagIds.length !== createTaskDto.tag_ids.length) {
            throw new BadRequestException("Duplicate tag IDs are not allowed.");
        }
        const existingTags = await this.tagModel.find({ _id: { $in: createTaskDto.tag_ids }, user_id, isDeleted: false });
        if (existingTags.length !== createTaskDto.tag_ids.length) {
            throw new BadRequestException("Tag IDs are invalid or not exist to the user.");
        }
        const existingList = await this.ListModel.findOne({ _id: createTaskDto.list_id, user_id, isDeleted: false });
        console.log("existingList", existingList)
        if (!existingList) {
            throw new BadRequestException("List does not exist or does not belong to the user.");
        }

        const newTask = new Task();
        newTask.title = createTaskDto.title;
        newTask.description = createTaskDto.description;
        newTask.due_date = new Date(`${createTaskDto.due_date}T00:00:00.000Z`);
        newTask.user_id = user_id;
        newTask.tag_ids = createTaskDto.tag_ids.map((id: string) => new mongoose.Types.ObjectId(id));
        newTask.list_id = new mongoose.Types.ObjectId(createTaskDto.list_id);

        await this.taskModel.create(newTask)
        return { success: true, message: "Task created successfully." };
    }

    async findAll(@CurrentUser() user: CurrentUserType, getTaskDto: GetTaskDto): Promise<{ success: boolean, message: string, data: Task[] }> {
        const userId = new mongoose.Types.ObjectId(user.id)

        const tasks = await this.taskModel.aggregate([
            {
                $match: {
                    user_id: userId,
                    isDeleted: false,
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
                                isDeleted: false
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
                                isDeleted: false
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

    async findOne() {

        return { success: true, message: "Task fetched successfully.", data: Task };
    }

    async update() {
        return { success: true, message: "Task Updated successfully.", };
    }

    async remove() {
        return { success: true, message: "Task Deleted successfully." };
    }
}