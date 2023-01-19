const mongoose = require('mongoose');

const userSchema = new Schema({
    username: {type: String, required:true, unique:true},
    password: {type: String, required:true},
    isAdmin: {type: Boolean, default:false},
    isLoggedIn: {type:Boolean, default:false}
})

userSchema.methods.generateAuthToken = function() {
    const token = jwt
    .sign({username: this.username, isAdmin: this.isAdmin}, config.get('jwtPrivateKey'))
    return token
}

module.exports = mongoose.model('User', userSchema, 'User');
