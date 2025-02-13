import { BooleanMessage } from "src/modules/user/interface/boolean-message.interface";

export interface CreateStickywall extends BooleanMessage  {
    title: string;
    discription: string;
    color_code: string;
}