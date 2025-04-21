const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    title: String,
    description: String,
    status: {
      type: String,
      enum: ["pending", "completed"],
      default: "pending",
    },
    dueDate: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Todo", todoSchema);
