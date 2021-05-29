const { Schema } = require('mongoose');

let measurement = new Schema({
    weight: { type: Number, required: true},
    neck: { type: Number, required: true},
    waist: { type: Number, required: true},
    hips: { type: Number },
    unit: {
        type: String,
        required: true,
        enum : ['imperial','metric'],
        default: 'imperial'
    }

}, { timestamps: true });

module.exports = mongoose.model('measurement', measurement, 'measurements');