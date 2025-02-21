import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './modules/user/user.module';
import { TagModule } from './modules/tag/tag.module';
import { ListModule } from './modules/list/list.module';
import { TaskModule } from './modules/task/task.module';
import { StickywallModule } from './modules/stickywall/stickywall.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI'),
      }),
      inject: [ConfigService]
    }),
    UserModule,
    TagModule,
    ListModule,
    TaskModule,
    StickywallModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule { }