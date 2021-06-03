const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator');

let measurementSchema = new Schema({
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
    date: {
        type: Date,
        required: true,
        default: Date.now(),
        validate: [ validator.isDate, "Date is invalid" ]
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
     }

}, { timestamps: true });

const Measurement = mongoose.model('measurement', measurementSchema, 'measurements');

const createMeasurement = function(weight, neck, waist, hips=undefined, unit='imperial', user) {
    const measurement = new Measurement({ weight, neck, waist, hips, unit, user});
    return measurement.save();
}

module.exports = {
    Measurement,
    createMeasurement
}