
const mongoose = require('mongoose');
// 1- Create Schema
const userSchema = new mongoose.Schema(
  {
username: {type: String, required: true},
email: {type: String, required: true, unique:true},

password: {type: String, required: true},

phone: {type: String, default:"0123456789"},








},{timestamps: true} );

const User = mongoose.model('user', userSchema);

module.exports = User;
