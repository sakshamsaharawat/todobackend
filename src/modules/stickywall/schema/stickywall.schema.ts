import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types, Schema as MongooseSchema } from 'mongoose';

export type StickyWallDocument = StickyWall & Document;

export type ListsDocument = StickyWall & Document;
@Schema({ timestamps: true })
export class StickyWall {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  user_id: Types.ObjectId;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  color_code: string;

  @Prop({ required: true })
  description: string;

  @Prop({ default: false })
  isDeleted: boolean;
}
export const StickyWallSchema = SchemaFactory.createForClass(StickyWall);