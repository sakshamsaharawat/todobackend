import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { LoginUserDto } from '@user/dto/login-user.dto';
import { CreateUserDto } from '@user/dto/create-user.dto';
import { UpdateUserDto } from '@user/dto/update.user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '@user/schema/user.schema';
import { JwtService } from '@nestjs/jwt';
import mongoose, { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { LoginUser } from '@user/interface/login-user.interface';
import { CurrentUserType } from '@user/interface/current-user.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User')
    private readonly userModel: Model<User>,
    private readonly jwtService: JwtService,
  ) { }
  async create(createUserDto: CreateUserDto): Promise<{ success: boolean, message: string, token: string, data: User }> {
    const isEmailExist = await this.userModel.findOne({ email: createUserDto.email.toLowerCase() });
    if (isEmailExist) {
      throw new BadRequestException("Email already exist.");
    }
    const newUser = new User()
    newUser.first_name = createUserDto.first_name;
    newUser.last_name = createUserDto.last_name;
    newUser.email = createUserDto.email.toLowerCase();
    newUser.password = await bcrypt.hash(createUserDto.password, 10);
    const result = await this.userModel.create(newUser);
    const token = this.jwtService.sign({ id: result._id, email: result.email });
    return { success: true, message: "User created successfully", token, data: result };
  }

  async login(loginUserDto: LoginUserDto): Promise<LoginUser> {
    const { email, password } = loginUserDto;
    const user = await (this.userModel.findOne({ email: email.toLowerCase(), is_deleted: false })).select('+password');
    if (!user) {
      throw new BadRequestException("User not found.");
    }
    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (!isPasswordMatched) {
      throw new UnauthorizedException("Invalid credentials.");
    }
    const token = this.jwtService.sign({ id: user._id, email: user.email });
    return { success: true, message: "User login successfully.", token };
  }

  async findOne(user: CurrentUserType): Promise<{ success: boolean, message: string, data: User }> {
    const isUserExist = await this.userModel.findById(user.id).select('+password');
    if (!isUserExist) {
      throw new NotFoundException("User not found.");
    }
    return { success: true, message: "User fetched successfuly.", data: isUserExist };
  }

  async update(updateUserDto: UpdateUserDto, user: CurrentUserType): Promise<{ success: boolean, message: string, data: User }> {
    const userId = new mongoose.Types.ObjectId(user.id);
    const isUserExist = await this.userModel.findOne({ _id: userId, is_deleted: false });
    if (!isUserExist) {
      throw new NotFoundException("User not found.");
    }
    const updatedUser = await this.userModel.findByIdAndUpdate(user.id, updateUserDto, { new: true });

    return { success: true, message: "User updated successfully.", data: updatedUser };
  }

  async remove( user: CurrentUserType): Promise<{ success: boolean, message: string }> {
    const isUserExist = await this.userModel.findOne({ _id: user.id, is_deleted: false });
    if (!isUserExist) {
      throw new NotFoundException("User not found.");
    }
    await this.userModel.findByIdAndUpdate(user.id, { is_deleted: true })
    return { success: true, message: "User deleted successfully." };
  }
}