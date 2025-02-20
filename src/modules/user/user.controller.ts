import { CurrentUserType } from './interface/current-user.interface';
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ForbiddenException, UsePipes } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update.user.dto';
import { BooleanMessage } from './interface/boolean-message.interface';
import { LoginUserDto } from './dto/login-user.dto';
import { LoginUser } from './interface/login-user.interface';
import { JwtAuthGuard } from 'src/middlewares/logger.middleware';
import { request } from 'express';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { TrimPipe } from 'src/pipes/trim.pipe';


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

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id') _id: string, @CurrentUser() User: any) {
    const tokenUserId = User.id;
    if (tokenUserId !== _id) {
      throw new ForbiddenException("You do not have permission to access this resource.");
    }
    return this.userService.findOne(_id);
  }

  @Post("update")
  @UseGuards(JwtAuthGuard)
  update(@Body() updateUserDto: UpdateUserDto, @CurrentUser() user: CurrentUserType) {
    return this.userService.update(updateUserDto, user);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
