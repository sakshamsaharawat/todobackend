import { LoginUserDto } from './dto/login-user.dto';
import { ConfigService } from '@nestjs/config';
import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update.user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import { JwtService } from '@nestjs/jwt';
import mongoose, { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { LoginUser } from './interface/login-user.interface';
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
  async create(createUserDto: CreateUserDto): Promise<{ success: boolean, message: string, token: string, data: User }> {
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
    return { success: true, message: "User created successfully", token, data: result }
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

  async update(updateUserDto: UpdateUserDto, user: CurrentUserType): Promise<{ success: boolean, message: string, data: User }> {
    const userId = new mongoose.Types.ObjectId(user.id)
    const isUserExist = await this.userModel.findOne({ _id: userId, isDeleted: false })
    if (!isUserExist) {
      throw new NotFoundException("User not found.")
    }
    const updatedUser = await this.userModel.findByIdAndUpdate(updateUserDto.id, updateUserDto, { new: true })

    return { success: true, message: "User updated successfully.", data: updatedUser }
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
