import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from '@user/schema/user.schema';
import { Types, Schema as MongooseSchema } from 'mongoose';

export type ListsDocument = Tags & Document;
@Schema({ timestamps: true })
export class Tags {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: User.name, required: true, index: true })
  user_id: Types.ObjectId;

  @Prop({ required: true, trim: true, minlength: 2, maxlength: 100 })
  title: string;

  @Prop({
    required: true,
    trim: true,
    match: /^#([0-9A-F]{3}|[0-9A-F]{6})$/i
  })
  color_code: string;

  @Prop({ default: false })
  is_deleted: boolean;
}

export const TagsSchema = SchemaFactory.createForClass(Tags);