import { Module } from '@nestjs/common';
import { StickywallService } from '@stickywall/stickywall.service';
import { StickywallController } from '@stickywall/stickywall.controller';
import { StickyWall, StickyWallSchema } from '@stickywall/schema/stickywall.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from '@user/user.module';
import { JwtAuthGuard } from 'src/middlewares/logger.middleware';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: StickyWall.name, schema: StickyWallSchema }]),
    UserModule
  ],
  controllers: [StickywallController],
  providers: [StickywallService, JwtAuthGuard]
})
export class StickywallModule { }