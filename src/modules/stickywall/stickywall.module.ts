import { Module } from '@nestjs/common';
import { StickywallService } from './stickywall.service';
import { StickywallController } from './stickywall.controller';
import { StickyWallSchema } from './schema/stickywall.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from '../user/user.module';
import { JwtAuthGuard } from 'src/middlewares/logger.middleware';

@Module({
     imports: [
          MongooseModule.forFeature([{ name: 'StickyWall', schema: StickyWallSchema }]),
          UserModule, 
      ],
    
  controllers: [StickywallController],
  providers: [StickywallService, JwtAuthGuard],
})
export class StickywallModule {}
