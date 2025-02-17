import { LoginUserDto } from './dto/login-user.dto';
import { ConfigService } from '@nestjs/config';
import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update.user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import { JwtService } from '@nestjs/jwt';
import mongoose, { Model } from 'mongoose';
import { BooleanMessage } from './interface/boolean-message.interface';
import * as bcrypt from 'bcrypt';
import { LoginUser } from './interface/login-user.interface';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { CurrentUserType } from './interface/current-user.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User')
    private readonly userModel: Model<User>,
    private jwtService: JwtService,
    private readonly configService: ConfigService
  ) { }
  // The function is declared as async, meaning it will handle asynchronous operations (like database queries or password hashing).
  async create(createUserDto: CreateUserDto): Promise<{ success: boolean, message: string, token: string,data: User }> {
    const isEmailExist = await this.userModel.findOne({ email: createUserDto.email.toLowerCase() })
    if (isEmailExist) {
      throw new BadRequestException("Email already exist.")
    }
    const newUser = new User()
    newUser.first_name = createUserDto.first_name;
    newUser.last_name = createUserDto.last_name;
    newUser.email = createUserDto.email.toLowerCase();
    newUser.password = await bcrypt.hash(createUserDto.password, 10)
    const result = await this.userModel.create(newUser)
    const token = this.jwtService.sign({ id: result._id, email: result.email })
    console.log("token--------", token)
    return { success: true, message: "User created successfully", token , data: result}
  }

  async login(loginUserDto: LoginUserDto): Promise<LoginUser> {
    const { email, password } = loginUserDto;
    const user = await (this.userModel.findOne({ email: email.toLowerCase() })).select('+password');
    if (!user) {
      throw new BadRequestException("User not found.")
    }
    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (!isPasswordMatched) {
      throw new UnauthorizedException("Invalid credentials.")
    }
    const token = this.jwtService.sign({ id: user._id, email: user.email })
    return { success: true, message: "User login successfully.", token }
  }

  findAll() {
    return `This action returns all user`;
  }

  async findOne(_id: string) {
    const user = await this.userModel.findById({ _id }).select('+password')
    if (!user) {
      throw new NotFoundException("User not found.")
    }
    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
