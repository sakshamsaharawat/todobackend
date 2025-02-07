import { Task } from "../schemas/task.schema";
import { CreateTask } from "./create-task.interface";

export interface GetTask extends CreateTask {
    data: Task[]
}