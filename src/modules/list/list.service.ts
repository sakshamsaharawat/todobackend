import { ListDeleteDto } from '@list/dto/list-delete.dto';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateListDto } from '@list/dto/list-create.dto';
import { UpdateListDto } from '@list/dto/list-update.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Lists } from '@list/schema/list.schema';
import mongoose, { Model } from 'mongoose';
import { BooleanMessage } from './interface/boolean-message.interface';
import { CurrentUserType } from '../user/interface/current-user.interface';
import { ListGetDto } from '@list/dto/list-get-dto';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';

@Injectable()
export class ListService {
    constructor(
        @InjectModel(Lists.name)
        private readonly ListModel: Model<Lists>
    ) { }

    async create(createListDto: CreateListDto, user: CurrentUserType): Promise<{ success: boolean, message: string, data: Lists }> {
        const isTitleExist = await this.ListModel.findOne({ title: { $regex: new RegExp(`^${createListDto.title}$`, "i") }, user_id: user.id });
        if (isTitleExist) {
            throw new BadRequestException("List already exist.");
        }

        const newList = new Lists();
        newList.title = createListDto.title;
        newList.color_code = createListDto.color_code;
        newList.user_id = new mongoose.Types.ObjectId(user.id);
        const list = await this.ListModel.create(newList);
        return { success: true, message: "List created successfully.", data: list };
    }

    async findAll(user: CurrentUserType): Promise<{ success: boolean, message: string, data: Lists[] }> {
        const userId = new mongoose.Types.ObjectId(user.id);
        const lists = await this.ListModel.find({ user_id: userId, is_deleted: false });

        return { success: true, message: lists.length ? "Lists fetched successfully." : "No list found.", data: lists };
    }

    async findOne(ListGetDto: ListGetDto, user: CurrentUserType): Promise<{ success: boolean, message: string, data: Lists }> {
        const userId = new mongoose.Types.ObjectId(user.id);
        const list = await this.ListModel.findOne({ _id: new mongoose.Types.ObjectId(ListGetDto.id), user_id: userId, is_deleted: false });
        if (!list) {
            throw new NotFoundException("List not found.");
        }

        return { success: true, message: "List fetched successfully.", data: list };
    }

    async update(updateListDto: UpdateListDto, user: CurrentUserType): Promise<{ success: boolean, message: string, data: Lists }> {
        const isTitleExist = await this.ListModel.findOne({ title: { $regex: new RegExp(`^${updateListDto.title}$`, "i") }, _id: { $ne: updateListDto.id } });
        if (isTitleExist) {
            throw new BadRequestException("List already exist.");
        }
        const updatedList = await this.ListModel.findByIdAndUpdate(updateListDto.id, updateListDto, { new: true });
        return { success: true, message: "List updated successfully.", data: updatedList };
    }

    async remove(ListDeleteDto: ListDeleteDto, @CurrentUser() user: CurrentUserType): Promise<BooleanMessage> {
        const userId = new mongoose.Types.ObjectId(user.id);
        const list = await this.ListModel.findOne({ _id: ListDeleteDto.id, user_id: userId, is_deleted: false });
        if (!list) {
            throw new NotFoundException("List not found.");
        }
        await this.ListModel.findByIdAndUpdate(ListDeleteDto.id, { is_deleted: true });
        return { success: true, message: "List deleted successfully." };
    }
}