import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
export type StickyWallDocument = StickyWall & Document;

@Schema({ timestamps: true })
export class StickyWall {
    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    color_code: string;

    @Prop({ required: true })
    content: string;
}
export const StickyWallSchema = SchemaFactory.createForClass(StickyWall)