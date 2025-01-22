import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({ timestamps: true })
export class User {
    @Prop({ required: true })
    first_name: string;

    @Prop({ required: true })
    last_name: string;

    @Prop({
        required: true, unique: true,
        trim: true,
        lowercase: true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    })
    email: string;

    @Prop({ required: true, minlength: 4, select: false })
    password: string;

    @Prop({ default: false })
    isDeleted: boolean;
}
export const UserSchema = SchemaFactory.createForClass(User);
