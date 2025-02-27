import { Module } from '@nestjs/common';
import { UserService } from '@user/user.service';
import { UserController } from '@user/user.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '@user/schema/user.schema';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => {
        try {
          const secret = config.get<string>('JWT_SECRET');
          const expiresIn = config.get<string | number>('EXPIRES_IN');
          if (!secret || !expiresIn) {
            throw new Error('JWT configuration missing in application config');
          }
          return {
            secret,
            signOptions: { expiresIn },
          };
        } catch (error) {
          throw new Error(`Failed to configure JWT: ${error.message}`);
        }
      },
    }),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])
  ],
  controllers: [UserController],
  providers: [UserService,],
  exports: [UserService, JwtModule]
})
export class UserModule { }