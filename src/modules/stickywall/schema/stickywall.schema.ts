import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from '@user/schema/user.schema';
import { Types, Schema as MongooseSchema } from 'mongoose';

export type StickyWallDocument = StickyWall & Document;

export type ListsDocument = StickyWall & Document;
@Schema({ timestamps: true })
export class StickyWall {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: User.name, required: true })
  user_id: Types.ObjectId;

  @Prop({
    required: [true, 'Title is required'],
    trim: true,
    minlength: [3, 'Title must be at least 3 characters long'],
    maxlength: [100, 'Title cannot exceed 100 characters'],
  })
  title: string;

  @Prop({
    required: true,
    trim: true,
    match: /^#([0-9A-F]{3}|[0-9A-F]{6})$/i
  })
  color_code: string;

  @Prop({
    default: '',
    trim: true,
    maxlength: [500, 'Description cannot exceed 500 characters'],
  })
  description: string;

  @Prop({ default: false })
  is_deleted: boolean;
}
export const StickyWallSchema = SchemaFactory.createForClass(StickyWall);