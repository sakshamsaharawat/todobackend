import { Task } from "../schemas/task.schema";

export interface CreateTask {
    success: boolean;
    message: string;
    data: Task;
}