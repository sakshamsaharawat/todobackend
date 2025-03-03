import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class User {
  @Prop({
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 50,
    match: /^[A-Za-z\s]+$/,
  })
  first_name: string;

  @Prop({
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 50,
    match: /^[A-Za-z\s]+$/,
  })
  last_name: string;

  @Prop({
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  })
  email: string;

  @Prop({ required: true, minlength: 4, select: false })
  password: string;

  @Prop({ required: false, match: /^\+\d{1,4}$/ })
  phone_code: string;

  @Prop({
    required: false,
    match: /^\d{7,15}$/,
  })
  phone_number: string;

  @Prop({
    required: false,
    enum: ['male', 'female', 'other'],
  })
  gender: string;

  @Prop({ required: false, trim: true })
  country: string;

  @Prop({ required: false, trim: true })
  city: string;

  @Prop({
    required: false,
    match: /^\d{4}-\d{2}-\d{2}$/,
  })
  dob: string;

  @Prop({ required: false, trim: true, maxlength: 255 })
  address: string;

  @Prop({ required: false, trim: true, maxlength: 300 })
  image_url: string;

  @Prop({ default: false })
  is_deleted: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
