import { ListDeleteDto } from './dto/list-delete.dto';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateListDto } from './dto/list-create.dto';
import { UpdateListDto } from './dto/list-update.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Lists } from './schema/list.schema';
import mongoose, { Model } from 'mongoose';
import { BooleanMessage } from './interface/boolean-message.interface';
import { CurrentUserType } from '../user/interface/current-user.interface';
import { ListGetDto } from './dto/list-get-dto';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';

@Injectable()
export class ListService {
    constructor(
        @InjectModel('Lists')
        private readonly ListModel: Model<Lists>,
    ) { }

    async create(createListDto: CreateListDto, user: CurrentUserType): Promise<BooleanMessage> {
        const isTitleExist = await this.ListModel.findOne({ title: { $regex: new RegExp(`^${createListDto.title}$`, "i") } });
        if (isTitleExist) {
            throw new BadRequestException("List already exist.");
        }

        const newList = new Lists()
        newList.title = createListDto.title;
        newList.color_code = createListDto.color_code;
        newList.user_id = new mongoose.Types.ObjectId(user.id);
        await this.ListModel.create(newList);
        return { success: true, message: "List created successfully." };
    }

    async findAll(user: CurrentUserType): Promise<{ success: boolean, message: string, data: Lists[] }> {
        const user_id = new mongoose.Types.ObjectId(user.id);
        const Lists = await this.ListModel.find({ user_id, isDeleted: false });
        if (!Lists.length) {
            throw new NotFoundException("Lists not found.");
        }
        return { success: true, message: "Lists fetched successfully.", data: Lists };
    }

    async findOne(ListGetDto: ListGetDto, user: CurrentUserType): Promise<{ success: boolean, message: string, data: Lists }> {
        const user_id = new mongoose.Types.ObjectId(user.id);
        const List = await this.ListModel.findOne({ _id: new mongoose.Types.ObjectId(ListGetDto.id), user_id, isDeleted: false });
        if (!List) {
            throw new NotFoundException("List not found.");
        }

        return { success: true, message: "List fetched successfully.", data: List };
    }

    async update(updateListDto: UpdateListDto, user: CurrentUserType): Promise<{ success: boolean, message: string, data: Lists }> {
        const user_id = new mongoose.Types.ObjectId(user.id);
        const List = await this.ListModel.findOne({ _id: updateListDto.id, user_id });
        if (!List) {
            throw new NotFoundException(`List with ID ${updateListDto.id} not found.`);
        }
        const isTitleExist = await this.ListModel.findOne({ title: { $regex: new RegExp(`^${updateListDto.title}$`, "i") }, _id: { $ne: updateListDto.id } });
        if (isTitleExist) {
            throw new BadRequestException("List already exist.");
        }
        const updatedList = await this.ListModel.findByIdAndUpdate(updateListDto.id, updateListDto, { new: true });
        return { success: true, message: "List Updated successfully.", data: updatedList };
    }

    async remove(ListDeleteDto: ListDeleteDto, @CurrentUser() user: CurrentUserType): Promise<BooleanMessage> {
        const user_id = new mongoose.Types.ObjectId(user.id);
        const List = await this.ListModel.findOne({ _id: ListDeleteDto.id, user_id, isDeleted: false });
        if (!List) {
            throw new NotFoundException("List not found.");
        }
        await this.ListModel.findByIdAndUpdate(ListDeleteDto.id, { isDeleted: true });
        return { success: true, message: "List Deleted successfully." };
    }
}