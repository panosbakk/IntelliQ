const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

if (!mongoose.models.User) {
  const userSchema = new mongoose.Schema({
    username: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    admin: {
      type: Boolean,
      default: false
    }
  });
  
  userSchema.pre('save', async function (next) {
    try {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(this.password, salt);
      this.password = hash;
      next();
    } catch (error) {
      next(error);
    }
  });
  
  const User = mongoose.model('User', userSchema);
  
  module.exports = User;
}


