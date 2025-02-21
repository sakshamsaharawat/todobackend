import { BooleanMessage } from "./boolean-message.interface";
import { Tags } from "../schema/tag.schema";

export interface FindAll extends BooleanMessage {
    data: Tags[];
}