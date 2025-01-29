import { CurrentUser } from './../../common/decorators/current-user.decorator';
import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { TagService } from "./tag.service";
import { CreateTagDto } from "./dto/tag.create.dto";
import { UpdateTagDto } from "./dto/tag.update.dto";
import { JwtAuthGuard } from "src/middlewares/logger.middleware";
import { CurrentUserType } from "../user/interface/current-user.interface";
import { TagGetDto } from './dto/tag-get-dto';
import { Tags } from './schema/tag.schema';
import { BooleanMessage } from './interface/boolean-message.interface';

@Controller('tag')
export class TagController {
    constructor(private readonly TagService: TagService) { }

    @Post("create")
    @UseGuards(JwtAuthGuard)
    create(@Body() createTagDto: CreateTagDto, @CurrentUser() user: CurrentUserType): Promise<BooleanMessage> {
        return this.TagService.create(createTagDto, user);
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    findAll(@CurrentUser() user: CurrentUserType): Promise<{ success: boolean, message: string, data: Tags[] }> {
        return this.TagService.findAll(user);
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    findOne(@Param() tagGetDto: TagGetDto, @CurrentUser() user: CurrentUserType): Promise<{ success: boolean, message: string, data: Tags }> {
        return this.TagService.findOne(tagGetDto, user);
    }

    @Patch()
    @UseGuards(JwtAuthGuard)
    update(@Body() updateTagDto: UpdateTagDto, @CurrentUser() user: CurrentUserType) {
        return this.TagService.update(updateTagDto, user);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.TagService.remove(+id);
    }
}
