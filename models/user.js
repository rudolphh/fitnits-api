const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const validator = require("validator");
const bcrypt = require('bcryptjs');

let user = new Schema(
  {
    username: {
      type: String,
      required: [true, "Enter a username."],
      unique: [true, "That username is taken."],
      lowercase: true,
      validate: [
        validator.isAlphanumeric,
        "Usernames may only have letters and numbers.",
      ],
    },
    email: {
      type: String,
      require: [true, "Enter an email address."],
      unique: [true, "That email address is taken."],
      lowercase: true,
      validate: [validator.isEmail, "Enter a valid email address."],
    },
    password: {
      type: String,
      required: [true, "Enter a password."],
      minLength: [4, "Password should be at least four characters"],
    },
    passwordConfirm: {
      type: String,
      required: [true, 'Retype your password.'],
      validate: {
        validator: function(el) {
            return el === this.password;
        }, 
        message: 'Passwords don\'t match.'
      }
    },
    role: {
      type: String,
      required: true,
      enum: ["normal", "admin"],
      default: "normal",
    },
    settings: {
        type: Schema.Types.ObjectId,
        ref: 'userSettings',
        required: true
     }
  },
  { timestamps: true }

);

/**
 * @action Defined Schema Virtual
 * @keys 
 *    1.   The first parameter can be named anything.
 *          It defines the name of the key to be named on the Schema
 * 
 *    2. Options Object
 *       ref: Model name for Child collection
 *       localField: Key for reference id, stored on Child Doc, as named on Parent Doc.
 *       foreignField: Key name that holds localField value on Child Document
 */
 
 user.virtual('measurements', {
    ref: 'measurement', //The Model to use
    localField: '_id', //Find in Model, where localField 
    foreignField: 'user', // is equal to foreignField
 });
 
 // Set Object and Json property to true. Default is set to false
 user.set('toObject', { virtuals: true });
 user.set('toJSON', { virtuals: true });


//schema middleware to apply before saving
user.pre('save', async function(next) {
    this.password = await bcrypt.hash(this.password, 12);
    this.passwordConfirm = undefined;
    next();
});

const User = mongoose.model("user", user, "users");
const createUser = function(username, email, password, passwordConfirm, settings) {
    const newUser = new User({ username, email, password, passwordConfirm, settings });
    return newUser.save();
};

module.exports = {
    User,
    createUser
};
