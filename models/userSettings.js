const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator');

let userSettingsSchema = new Schema({
    gender: {
        type: String,
        required: true,
        enum : ['male','female'],
        default: 'male'
    }

}, { timestamps: true });

const UserSettings = mongoose.model('userSettings', userSettingsSchema, 'userSettings');

const createUserSettings = function(gender) {
    const settings = new UserSettings({ gender });
    return settings.save();
}

module.exports = { 
    UserSettings,
    createUserSettings
};