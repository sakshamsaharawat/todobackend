import { Module } from '@nestjs/common';
import { TagService } from './tag.service';
import { TagController } from './tag.controller';
import { TagsSchema } from './schema/tag.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtAuthGuard } from 'src/middlewares/logger.middleware';
import { UserModule } from '../user/user.module';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Tags', schema: TagsSchema }]),
        UserModule, 
    ],
    controllers: [TagController],
    providers: [TagService, JwtAuthGuard],
})
export class TagModule { }
