const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const adminUserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
  },
}, {
  timestamps: true,
});

const adminUser = mongoose.model('Admin User', adminUserSchema);

module.exports = adminUser;