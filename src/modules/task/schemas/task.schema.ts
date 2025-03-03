import { Lists } from '@list/schema/list.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Tags } from '@tag/schema/tag.schema';
import { User } from '@user/schema/user.schema';
import { Document, Schema as MongooseSchema, Types } from 'mongoose';

export type TaskDocument = Task & Document;

@Schema({ timestamps: true })
export class Task {
  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: User.name,
    required: [true, 'User ID is required'],
  })
  user_id: Types.ObjectId;

  @Prop({
    required: [true, 'Title is required'],
    trim: true,
    minlength: [3, 'Title must be at least 3 characters long'],
    maxlength: [100, 'Title cannot exceed 100 characters'],
  })
  title: string;

  @Prop({
    default: '',
    trim: true,
    maxlength: [500, 'Description cannot exceed 500 characters'],
  })
  description: string;

  @Prop({
    type: Date,
    required: [true, 'Due date is required'],
    validate: {
      validator: (value: Date) => value = new Date(),
      message: 'Due date must be a future date',
    },
  })
  due_date: Date;

  @Prop({
    type: [MongooseSchema.Types.ObjectId],
    ref: Tags.name,
    validate: {
      validator: (tags: Types.ObjectId[]) => Array.isArray(tags),
      message: 'Tags must be an array of ObjectIds',
    },
  })
  tag_ids: Types.ObjectId[];

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    required: false,
    ref: Lists.name,
    default: null,
  })
  list_id: Types.ObjectId;

  @Prop({
    type: Boolean,
    default: false,
  })
  is_deleted: boolean;
}
export const TaskSchema = SchemaFactory.createForClass(Task);