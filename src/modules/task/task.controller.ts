import { CreateTaskDto } from './dto/create-task.dto';
import { JwtAuthGuard } from 'src/middlewares/logger.middleware';
import { Body, Controller, Delete, Get, Patch, Post, UseGuards } from "@nestjs/common";
import { TaskService } from './task.service';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { CurrentUserType } from '../user/interface/current-user.interface';
import { CreateTask } from './interface/create-task.interface';
import { GetTask } from './interface/get-task.interface';

@Controller('task')
export class TaskController {
    constructor(private readonly TaskService: TaskService) { }

    @Post("create")
    @UseGuards(JwtAuthGuard)
    create(@Body() createTaskDto: CreateTaskDto, @CurrentUser() user: CurrentUserType): Promise<CreateTask> {
        return this.TaskService.create(createTaskDto, user);
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    findAll(@CurrentUser() user: CurrentUserType): Promise<GetTask> {
        return this.TaskService.findAll(user);
    }

    @Get('get-one')

    findOne() {
        return this.TaskService.findOne();
    }

    @Patch()

    update() {
        return this.TaskService.update();
    }

    @Delete(':id')

    remove() {
        return this.TaskService.remove();
    }
}
