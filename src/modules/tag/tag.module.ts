import { Module } from '@nestjs/common';
import { TagService } from '@tag/tag.service';
import { TagController } from '@tag/tag.controller';
import { Tags, TagsSchema } from '@tag/schema/tag.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtAuthGuard } from 'src/middlewares/logger.middleware';
import { UserModule } from '@user/user.module';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Tags.name, schema: TagsSchema }]),
        UserModule
    ],
    controllers: [TagController],
    providers: [TagService, JwtAuthGuard]
})
export class TagModule { }