const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const taskSchema = new Schema({
  username: {type:String, required:true},
  title: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, required: true },
  date: { type: Date, required: true },
  reason:{type:String},
}, {
  timestamps: true,
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;