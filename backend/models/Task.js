const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  text: { type: String, required: true },
  completed: { type: Boolean, default: false },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

module.exports = mongoose.model('Task', taskSchema);
