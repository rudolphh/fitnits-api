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
        required: true,
        min: [ '1900-01-01', 'Must be positive' ],
        validate: [ validator.isDate, "Date is invalid" ]
    },
    height: {
        type: Number,
        required: [ true, 'Need height for basic formula'],
        min: [ 12, 'You are too small to enjoy this ride' ]
    },
    unit: {
        type: String,
        required: true,
        enum : ['imperial','metric'],
        default: 'imperial'
    },
    dietType: {
        type: String,
        required: true,
        enum : [ 'cut','bulk' ],
        default: 'cut'
    },
    rate: {
        type: Number,
        required: true,
        min: [ 0, 'Must be positive' ]
    },
    reminderFrequency: {
        type: String,
        required: true,
        enum : ['weekly','bi-weekly', 'monthly', 'bi-monthly', 'quarterly' ],
        default: 'weekly'
    },
}, { timestamps: true });

const UserSettings = mongoose.model('userSettings', userSettingsSchema, 'userSettings');

const createUserSettings = function(requestBody) {
    let { gender, reminderFrequency } = requestBody;
    const settings = new UserSettings({ gender, reminderFrequency });
    return settings.save();
}

module.exports = { 
    UserSettings,
    createUserSettings
};