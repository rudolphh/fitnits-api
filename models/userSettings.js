const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator');

let userSettingsSchema = new Schema({
    gender: {
        type: String,
        required: true,
        enum : ['male','female'],
        default: 'male'
    },
    birthDate: {
        type: Date,
        //required: true,
        min: [ '1900-01-01', 'Must be positive' ],
        validate: [ validator.isDate, "Date is invalid" ]
    },
    height: {
        type: Number,
        //required: [ true, 'Need height for basic formula'],
        min: [ 24, 'You are too small to enjoy this ride' ],
        default: 72
    },
    unit: {
        type: String,
        required: true,
        enum : ['imperial','metric'],
        default: 'imperial'
    },
    strategy: {
        type: String,
        required: true,
        enum : [ 'cut','bulk' ],
        default: 'cut'
    },
    rate: {
        type: Number,
        required: true,
        min: [ 1, 'Must be positive' ],
        default: 20
    },
    reminderValue: {
        type: Number,
        required: true,
        min: [1, 'Must be positive'],
        max: [3, 'Number values only 1 to 3'],
        default: 2
    },
    reminderFrequency: {
        type: String,
        required: true,
        enum : ['weekly', 'monthly'],
        default: 'weekly'
    },
}, { timestamps: true });

const UserSettings = mongoose.model('userSettings', userSettingsSchema, 'userSettings');

const createUserSettings = function(requestBody) {
    const settings = new UserSettings(requestBody);
    return settings.save();
}

module.exports = { 
    UserSettings,
    createUserSettings
};