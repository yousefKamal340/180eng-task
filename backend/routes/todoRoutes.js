const express = require("express");
const jwt = require("jsonwebtoken");
const Todo = require("../models/Todo");
const User = require("../models/User");
const router = express.Router();

function authenticate(req, res, next) {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ error: "Access denied" });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    res.status(400).json({ error: "Invalid token" });
  }
}

router.use(authenticate);

router.get("/", async (req, res) => {
  const { status, search } = req.query;
  const query = { userId: req.user.id };
  if (status) query.status = status;
  if (search) query.title = new RegExp(search, "i");
  const todos = await Todo.find(query);
  res.json(todos);
});

router.post("/", async (req, res) => {
  const { title, description, status, dueDate } = req.body;
  const todo = new Todo({
    userId: req.user.id,
    title,
    description,
    status,
    dueDate,
  });
  await todo.save();
  res.status(201).json(todo);
});

router.put("/:id", async (req, res) => {
  const todo = await Todo.findOneAndUpdate(
    { _id: req.params.id, userId: req.user.id },
    req.body,
    { new: true }
  );
  res.json(todo);
});

router.delete("/:id", async (req, res) => {
  await Todo.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
  res.json({ message: "Deleted" });
});

module.exports = router;
