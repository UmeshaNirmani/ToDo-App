const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  UserId: {
    type: String,
    required: false,
  },
  ToDoId: {
    type: String,
    unique: true,
    required: true,
  },
  Title: {
    type: String,
    unique: true,
    required: true,
  },
  Description: {
    type: String,
    required: true,
  },
  Status: {
    type: String,
    enum: ["Not_started", "Started", "Working_on", "Done"],
    required: true,
  },
  TimeStampe: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("ToDo", todoSchema);
