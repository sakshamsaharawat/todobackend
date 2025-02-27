import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtAuthGuard } from 'src/middlewares/logger.middleware';
import { UserModule } from '@user/user.module';
import { TaskController } from '@task/task.controller';
import { TaskService } from '@task/task.service';
import { Task, TaskSchema } from '@task/schemas/task.schema';
import { Tags, TagsSchema } from '@tag/schema/tag.schema';
import { Lists, ListsSchema } from '@list/schema/list.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Task.name, schema: TaskSchema },
            { name: Tags.name, schema: TagsSchema },
            { name: Lists.name, schema: ListsSchema }
        ]),
        UserModule,
    ],
    controllers: [TaskController],
    providers: [TaskService, JwtAuthGuard],
})
export class TaskModule { }