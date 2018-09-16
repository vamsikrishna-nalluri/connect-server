const mongoose = require("mongoose");
var uniqueValidator = require('mongoose-unique-validator');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');
var secret = require('../config/config').secret;

const Schema = mongoose.Schema;

let UserSchema = new Schema({
    username: { type: String, unique: true, required: [true, "cannot be empty."], lowercase: true, index: true },
    email: { type: String, unique: true, required: [true, "cannot be empty."], lowercase: true, index: true },
    bio: String,
    image: String,
    salt: String,
    hash: String
}, { timestamps: true });

UserSchema.plugin(uniqueValidator, { message: "is already taken." });

/*
 *
 * setPassword — used to generate a password by randomly creating user’s hash & salt properties to encrypt a password provided by user using Crypto library
 * validPassword— used to compare the provided password with the users’ actual password
 * generateJWT — used to create a JSON Web Token that expires 60 days from creation and will be stored and used in the Frontend’s window.localStorage()
 * toAuthJSON — used to return specified user’s properties (username, email, bio…)
 *
 */

UserSchema.methods.setPassword = function(password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};

UserSchema.methods.validPassword = function(password) {
    var hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
    return this.hash === hash;
};

UserSchema.methods.generateJWT = function() {
    var today = new Date();
    var exp = new Date(today);
    exp.setDate(today.getDate() + 60);
    return jwt.sign({
        id: this._id,
        username: this.username,
        exp: parseInt(exp.getTime() / 1000)
    }, secret ? secret : 'secretkey')
};

UserSchema.methods.toAuthJSON = function() {
    return {
        username: this.username,
        email: this.email,
        bio: this.bio,
        image: this.image,
        token: this.generateJWT()
    };
};


module.exports = mongoose.model('User', UserSchema);
