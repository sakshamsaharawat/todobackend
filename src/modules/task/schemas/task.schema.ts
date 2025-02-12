import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema, Types } from 'mongoose';

export type TaskDocument = Task & Document;

@Schema({ timestamps: true })
export class Task {
  @Prop({ type: MongooseSchema.ObjectId, ref: 'User', required: true })
  user_id: Types.ObjectId;

  @Prop({ required: true })
  title: string;

  @Prop({ default: '' })
  description: string;

  @Prop({ required: true })
  due_date: Date;

  @Prop({ type: [MongooseSchema.ObjectId], ref: "Tags" })
  tag_ids: Types.ObjectId[];

  @Prop({ type: MongooseSchema.ObjectId, ref: "Lists" })
  list_id: Types.ObjectId;

  @Prop({ default: false })
  isDeleted: boolean;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
