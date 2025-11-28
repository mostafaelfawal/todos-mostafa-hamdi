import { Task } from "../models/Task.model.js";

export const createTask = async (req, res) => {
  const task = new Task({
    title: req.body.title,
    completed: false,
  });

  await task.save();
  res.json({ message: "The task has been added successfully!" });
};

export const getTasks = async (_, res) => {
  const tasks = await Task.find();
  res.json(tasks);
};

export const updateTask = async (req, res) => {
  const updatedTask = await Task.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      completed: req.body.completed,
    },
    { new: true }
  );
  if (!updatedTask) {
    res.status(404).json({ message: "Task not found" });
  }
  res.json({ message: "The Task has been updated successfully!" });
};

export const deleteTask = async (req, res) => {
  const deletedTask = await Task.findByIdAndDelete(req.params.id);
  if (!deletedTask) {
    res.status(404).json({ message: "Task not found" });
  }
  res.json({ message: "The Task has been deleted successfully!" });
};
