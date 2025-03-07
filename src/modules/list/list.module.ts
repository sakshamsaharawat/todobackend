import { Module } from '@nestjs/common';
import { ListService } from '@list/list.service';
import { ListController } from '@list/list.controller';
import { Lists, ListsSchema } from '@list/schema/list.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtAuthGuard } from 'src/middlewares/logger.middleware';
import { UserModule } from '@user/user.module';
import { TaskModule } from '@task/task.module';
import { Task, TaskSchema } from '@task/schemas/task.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Lists.name, schema: ListsSchema },
            { name: Task.name, schema: TaskSchema }
        ]),
        UserModule,
        TaskModule
    ],
    controllers: [ListController],
    providers: [ListService, JwtAuthGuard],
    exports: [ListService]
})
export class ListModule { }