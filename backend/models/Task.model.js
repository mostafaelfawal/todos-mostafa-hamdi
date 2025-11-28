import { model, Schema } from "mongoose";

const TaskSchema = new Schema({
  title: String,
  completed: Boolean,
});

export const Task = model("Task", TaskSchema);
