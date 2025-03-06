import { CreateTaskDto } from '@task/dto/create-task.dto';
import { JwtAuthGuard } from 'src/middlewares/logger.middleware';
import { Body, Controller, Delete, Get, Param, Post, Query, UseGuards } from "@nestjs/common";
import { TaskService } from '@task/task.service';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { CurrentUserType } from '../user/interface/current-user.interface';
import { CreateTask } from './interface/create-task.interface';
import { GetTaskDto } from '@task/dto/get-task.dto';
import { UpdateTaskDto } from '@task/dto/update-task.dto';
import { Task } from '@task/schemas/task.schema';
import { DeleteTaskDto } from '@task/dto/delete-task.dto';
import { DeleteManyTaskDto } from './dto/delete-many-task';

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
    findAll(@Query() getTaskDto: GetTaskDto, @CurrentUser() user: CurrentUserType): Promise<{ success: boolean, message: string, data: Task[] }> {
        return this.TaskService.findAll(user, getTaskDto);
    }

    @Post("update")
    @UseGuards(JwtAuthGuard)
    update(@Body() updateTaskDto: UpdateTaskDto, @CurrentUser() user: CurrentUserType): Promise<{ success: boolean, message: string, data: Task }> {
        return this.TaskService.update(updateTaskDto, user);
    }

    @Delete(":id")
    @UseGuards(JwtAuthGuard)
    remove(@Param() deleteTaskDto: DeleteTaskDto, @CurrentUser() user: CurrentUserType): Promise<{ success: boolean, message: string }> {
        return this.TaskService.remove(deleteTaskDto, user);
    }

    @Post("deletemany")
    @UseGuards(JwtAuthGuard)
    removemany(@Body() deleteManyTaskDto: DeleteManyTaskDto, @CurrentUser() user: CurrentUserType): Promise<{ success: boolean, message: string }> {
        return this.TaskService.removemany(deleteManyTaskDto, user);
    }
}