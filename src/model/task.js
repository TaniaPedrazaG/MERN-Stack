const mongoose = require("mongoose");
const { Schema } = mongoose;

const TaskSchema = new Schema({
  firstName: { type: String, require: true },
  lastName: { type: String, required: true },
  address: { type: String, required: true },
});

module.exports = mongoose.model("Task", TaskSchema);
