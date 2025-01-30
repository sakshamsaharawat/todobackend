import { BadRequestException, Injectable, Type } from '@nestjs/common';
import { Task } from './schemas/task.schema';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { CreateTaskDto } from './dto/create-task.dto';
import { CurrentUserType } from '../user/interface/current-user.interface';
import { Tags } from '../tag/schema/tag.schema';
import { Lists } from '../list/schema/list.schema';
import { CreateTask } from './interface/create-task.interface';

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
        console.log("createTaskDto--------", createTaskDto)
        const user_id = new mongoose.Types.ObjectId(user.id);

        const uniqueTagIds = [...new Set(createTaskDto.tag_ids)];
        if (uniqueTagIds.length !== createTaskDto.tag_ids.length) {
            throw new BadRequestException("Duplicate tag IDs are not allowed.");
        }
        console.log("user_id", user_id)
        const existingTags = await this.tagModel.find({ _id: { $in: createTaskDto.tag_ids }, user_id, isDeleted: false });
        console.log("existingTags===", existingTags)
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
        newTask.date = createTaskDto.date;
        newTask.user_id = user_id;
        newTask.tag_ids = createTaskDto.tag_ids.map((id: string) => new mongoose.Types.ObjectId(id));
        newTask.list_id = new mongoose.Types.ObjectId(createTaskDto.list_id);

        await this.taskModel.create(newTask)
        return { success: true, message: "Task created successfully." };
    }

    async findAll() {

        return { success: true, message: "Tasks fetched successfully." };
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