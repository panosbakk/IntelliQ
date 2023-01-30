const mongoose = require('mongoose');
require("custom-env").env("localhost");
const userSchema = new mongoose.Schema({
    username: {type: String, required:true, unique:true},
    password: {type: String, required:true},
    isAdmin: {type: Boolean, default:false},
    isLoggedIn: {type:Boolean, default:false}
})

userSchema.methods.generateAuthToken = function() {
    const token = jwt
    .sign({username: this.username, isAdmin: this.isAdmin}, process.env.JWTSECRET)
    return token
}

module.exports = mongoose.model('User', userSchema, 'User');
