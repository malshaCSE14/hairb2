/**
 * Created by malsha_h on 7/13/2017.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passwordHash = require('password-hash');
var userSchema = new Schema({
    firstname: String,
    lastname: String,
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

userSchema.methods.comparePassword =function (password) {
    return passwordHash.verify(password, this.password);
};

module.exports = mongoose.model('User', userSchema);

// make this available to our users in our Node applications