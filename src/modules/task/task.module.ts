import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtAuthGuard } from 'src/middlewares/logger.middleware';
import { UserModule } from '../user/user.module';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { TaskSchema } from './schemas/task.schema';
import { TagsSchema } from '../tag/schema/tag.schema';
import { ListsSchema } from '../list/schema/list.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'Task', schema: TaskSchema },
            { name: 'Tags', schema: TagsSchema },
            { name: 'Lists', schema: ListsSchema }
        ]),
        UserModule,
    ],
    controllers: [TaskController],
    providers: [TaskService, JwtAuthGuard],
})
export class TaskModule { }
