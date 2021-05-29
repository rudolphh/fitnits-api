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
  },
  { timestamps: true }

);

//schema middleware to apply before saving
user.pre('save', async function(next) {
    this.password = await bcrypt.hash(this.password, 12);
    this.passwordConfirm = undefined;
    next();
});

module.exports = mongoose.model("user", user, "users");
