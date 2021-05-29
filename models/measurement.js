const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator');

let measurement = new Schema({
    weight: { type: Number, required: true, min: [0, 'Must be positive']},
    neck: { type: Number, required: true, min: [0, 'Must be positive']},
    waist: { type: Number, required: true, min: [0, 'Must be positive']},
    hips: { type: Number, min: [0, 'Must be positive']},
    unit: {
        type: String,
        required: true,
        enum : ['imperial','metric'],
        default: 'imperial'
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
     }

}, { timestamps: true });

module.exports = mongoose.model('measurement', measurement, 'measurements');