import { TagDeleteDto } from '@tag/dto/tag-delete.dto';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTagDto } from '@tag/dto/tag-create.dto';
import { UpdateTagDto } from '@tag/dto/tag-update.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Tags } from '@tag/schema/tag.schema';
import mongoose, { Model } from 'mongoose';
import { BooleanMessage } from '@list/interface/boolean-message.interface';
import { CurrentUserType } from '@user/interface/current-user.interface';
import { TagGetDto } from '@tag/dto/tag-get-dto';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';

@Injectable()
export class TagService {
    constructor(
        @InjectModel('Tags')
        private readonly tagModel: Model<Tags>,
    ) { }

    async create(createTagDto: CreateTagDto, user: CurrentUserType): Promise<{ success: boolean, message: string, data: Tags }> {
        const isTitleExist = await this.tagModel.findOne({ title: { $regex: new RegExp(`^${createTagDto.title}$`, "i") }, user_id: user.id });
        if (isTitleExist) {
            throw new BadRequestException("Tag already exist.");
        }
        const newTag = new Tags();
        newTag.title = createTagDto.title;
        newTag.color_code = createTagDto.color_code;
        newTag.user_id = new mongoose.Types.ObjectId(user.id);
        const tag = await this.tagModel.create(newTag);
        return { success: true, message: "Tag created successfully.", data: tag };
    }

    async findAll(user: CurrentUserType): Promise<{ success: boolean, message: string, data: Tags[] }> {
        const user_id = new mongoose.Types.ObjectId(user.id);
        const tags = await this.tagModel.find({ user_id, is_deleted: false });
        return { success: true, message: tags.length ? "Tags fetched successfully." : "Tag not found", data: tags };
    }

    async findOne(tagGetDto: TagGetDto, user: CurrentUserType): Promise<{ success: boolean, message: string, data: Tags }> {
        const user_id = new mongoose.Types.ObjectId(user.id);
        const tag = await this.tagModel.findOne({ _id: new mongoose.Types.ObjectId(tagGetDto.id), user_id, is_deleted: false });
        if (!tag) {
            throw new NotFoundException("Tag not found.");
        }
        return { success: true, message: "Tag fetched successfully.", data: tag };
    }

    async update(updateTagDto: UpdateTagDto, user: CurrentUserType): Promise<{ success: boolean, message: string, data: Tags }> {
        const user_id = new mongoose.Types.ObjectId(user.id);
        const tag = await this.tagModel.findOne({ _id: updateTagDto.id, user_id });
        if (!tag) {
            throw new NotFoundException(`Tag with ID ${updateTagDto.id} not found.`);
        }
        const isTitleExist = await this.tagModel.findOne({ title: { $regex: new RegExp(`^${updateTagDto.title}$`, "i") }, _id: { $ne: updateTagDto.id } });
        if (isTitleExist) {
            throw new BadRequestException("Tag already exist.");
        }
        const updatedTag = await this.tagModel.findByIdAndUpdate(updateTagDto.id, updateTagDto, { new: true });
        return { success: true, message: "Tag updated successfully.", data: updatedTag };
    }

    async remove(tagDeleteDto: TagDeleteDto, @CurrentUser() user: CurrentUserType): Promise<BooleanMessage> {
        const user_id = new mongoose.Types.ObjectId(user.id);
        const tag = await this.tagModel.findOne({ _id: tagDeleteDto.id, user_id, is_deleted: false });
        if (!tag) {
            throw new NotFoundException("Tag not found.");
        }
        await this.tagModel.findByIdAndUpdate(tagDeleteDto.id, { is_deleted: true });
        return { success: true, message: "Tag Deleted successfully." };
    }
}