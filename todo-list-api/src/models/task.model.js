const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  description: { type: String },
  status: { type: String, enum: ["pendiente", "completada"], default: "pendiente" },
  subtasks: [
    {
      title: { type: String, required: true },
      status: { type: String, enum: ["pendiente", "completada"], default: "pendiente" }
    }
  ],
  comments: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
      content: { type: String, required: true },
    }
  ],
});

module.exports = mongoose.model("Task", taskSchema);
