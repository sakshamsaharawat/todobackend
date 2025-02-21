import { CurrentUserType } from './interface/current-user.interface';
import { Controller, Get, Post, Body, Param, Delete, UseGuards, UsePipes } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update.user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { LoginUser } from './interface/login-user.interface';
import { JwtAuthGuard } from 'src/middlewares/logger.middleware';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { TrimPipe } from 'src/pipes/trim.pipe';
import { User } from './schema/user.schema';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post("signup")
  @UsePipes(new TrimPipe())
  create(@Body() createUserDto: CreateUserDto): Promise<{ success: boolean, message: string, token: string }> {
    return this.userService.create(createUserDto);
  }

  @Post("login")
  @UsePipes(new TrimPipe())
  login(@Body() loginUserDto: LoginUserDto): Promise<LoginUser> {
    return this.userService.login(loginUserDto)
  }

  @Get("profile")
  @UseGuards(JwtAuthGuard)
  async findOne(@CurrentUser() user: CurrentUserType) {
    return this.userService.findOne(user);
  }

  @Post("update")
  @UseGuards(JwtAuthGuard)
  update(@Body() updateUserDto: UpdateUserDto, @CurrentUser() user: CurrentUserType): Promise<{ success: boolean, message: string, data: User }> {
    return this.userService.update(updateUserDto, user);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}