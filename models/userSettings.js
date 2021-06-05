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
    reminderFrequency: {
        type: String,
        required: true,
        enum : ['weekly','bi-weekly', 'monthly', 'bi-monthly', 'quarterly' ],
        default: 'weekly'
    }
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