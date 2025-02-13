import { FindAll } from './../tag/interface/find-all.interface';
import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { StickywallService } from "./stickywall.service";
import { CreateStickwallyDto } from "./dto/stickywall.dto";
import { CurrentUser } from "src/common/decorators/current-user.decorator";
import { CurrentUserType } from "../user/interface/current-user.interface";
import { JwtAuthGuard } from 'src/middlewares/logger.middleware';
import { StickyWall } from './schema/stickywall.schema';

@Controller('stickywall')
export class StickywallController {
    constructor(private readonly stickywallService: StickywallService) { }

    @Post("create")
    @UseGuards(JwtAuthGuard)
    create(@Body() createStickwallyDto: CreateStickwallyDto, @CurrentUser() user: CurrentUserType): Promise<{ success: boolean, message: string, data: StickyWall }> {
        return this.stickywallService.create(createStickwallyDto, user);
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    findAll(@CurrentUser() user: CurrentUserType): Promise<{ success: boolean, message: string, data: StickyWall[] }> {
        return this.stickywallService.findAll(user)
    }
}