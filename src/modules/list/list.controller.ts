import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { ListService } from "@list/list.service";
import { CreateListDto } from "@list/dto/list-create.dto";
import { UpdateListDto } from "@list/dto/list-update.dto";
import { JwtAuthGuard } from "src/middlewares/logger.middleware";
import { CurrentUserType } from "../user/interface/current-user.interface";
import { ListGetDto } from '@list/dto/list-get-dto';
import { Lists } from '@list/schema/list.schema';
import { BooleanMessage } from './interface/boolean-message.interface';
import { ListDeleteDto } from '@list/dto/list-delete.dto';

@Controller('list')
export class ListController {
    constructor(private readonly ListService: ListService) { }

    @Post("create")
    @UseGuards(JwtAuthGuard)
    create(@Body() createListDto: CreateListDto, @CurrentUser() user: CurrentUserType): Promise<BooleanMessage> {
        return this.ListService.create(createListDto, user);
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    findAll(@CurrentUser() user: CurrentUserType): Promise<{ success: boolean, message: string, data: Lists[] }> {
        return this.ListService.findAll(user);
    }

    @Get('get-one')
    @UseGuards(JwtAuthGuard)
    findOne(@Body() ListGetDto: ListGetDto, @CurrentUser() user: CurrentUserType): Promise<{ success: boolean, message: string, data: Lists }> {
        return this.ListService.findOne(ListGetDto, user);
    }

    @Patch()
    @UseGuards(JwtAuthGuard)
    update(@Body() updateListDto: UpdateListDto, @CurrentUser() user: CurrentUserType): Promise<{ success: boolean, message: string, data: Lists }> {
        return this.ListService.update(updateListDto, user);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    remove(@Param() ListDeleteDto: ListDeleteDto, @CurrentUser() user: CurrentUserType): Promise<BooleanMessage> {
        return this.ListService.remove(ListDeleteDto, user);
    }
}