import { Module } from '@nestjs/common';
import { ListService } from './list.service';
import { ListController } from './list.controller';
import { Lists, ListsSchema } from './schema/list.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtAuthGuard } from 'src/middlewares/logger.middleware';
import { UserModule } from '@user/user.module';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Lists.name, schema: ListsSchema }]),
        UserModule
    ],
    controllers: [ListController],
    providers: [ListService, JwtAuthGuard]
})
export class ListModule { }