import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types, Schema as MongooseSchema } from 'mongoose';

export type ListsDocument = Lists & Document;

@Schema({ timestamps: true })
export class Lists {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  user_id: Types.ObjectId;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  color_code: string;

  @Prop({ default: false })
  isDeleted: boolean;
}
export const ListsSchema = SchemaFactory.createForClass(Lists);
