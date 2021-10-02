const express = require("express");
const router = express.Router();

const Task = require("../model/task");

router.get("/", async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

router.get("/:id", async (req, res) => {
  const tasks = await Task.findById(req.params.id);
  res.json(tasks);
});

router.post("/", async (req, res) => {
  const { firstName, lastName, address } = req.body;
  const task = new Task({ firstName, lastName, address });
  await task.save();
  res.json({ status: "Task saved" });
});

router.put("/:id", async (req, res) => {
  const { firstName, lastName, address } = req.body;
  const newTask = { firstName, lastName, address };
  await Task.findByIdAndUpdate(req.params.id, newTask);
  res.json({ status: "Task updated" });
});

router.delete("/:id", async (req, res) => {
  await Task.findByIdAndRemove(req.params.id);
  res.json({ status: "Task deleted" });
});

module.exports = router;
