import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema, Types } from 'mongoose';

export type ListsDocument = Lists & Document;
@Schema({ timestamps: true })
export class Lists {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  user_id: Types.ObjectId;

  @Prop({})
  title: string;

  @Prop({})
  color_code: string;

  @Prop({ default: false })
  isDeleted: boolean;
}
export const ListSchema = SchemaFactory.createForClass(Lists);
