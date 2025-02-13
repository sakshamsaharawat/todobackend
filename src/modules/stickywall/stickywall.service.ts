import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateStickwallyDto } from './dto/stickywall.dto';
import { CurrentUserType } from '../user/interface/current-user.interface';
import mongoose, { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { StickyWall } from './schema/stickywall.schema';
import { title } from 'process';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';

@Injectable()
export class StickywallService {
  constructor(
    @InjectModel('StickyWall')
    private readonly stickywallModel: Model<StickyWall>
  ) { }

  async create(createStickwallyDto: CreateStickwallyDto, user: CurrentUserType): Promise<{ success: boolean, message: string, data: StickyWall }> {
    const userId = new mongoose.Types.ObjectId(user.id);
    const stickywall = await this.stickywallModel.findOne({ title: { $regex: new RegExp(`^${createStickwallyDto.title}$`, "i") }, user_id: userId, isDeleted: false })
    if (stickywall) {
      throw new BadRequestException("stickywall Already exist.")
    }
    const newStickyWall = new StickyWall()
    newStickyWall.title = createStickwallyDto.title,
      newStickyWall.description = createStickwallyDto.description,
      newStickyWall.user_id = userId
      newStickyWall.color_code = createStickwallyDto.color_code
      await this.stickywallModel.create(newStickyWall)
    return { success: true, message: "Stickywall Created successfully", data: newStickyWall }
  }

  async findAll(@CurrentUser() user: CurrentUserType): Promise<{ success: boolean, message: string, data: StickyWall[] }> {
    const userId = new mongoose.Types.ObjectId(user.id);
    const StickyWall = await this.stickywallModel.find({ user_id: userId, isDeleted: false })
    return { success: true, message: "", data: StickyWall }
  }
}
