const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const validator = require("validator");

let measurementSchema = new Schema(
  {
    weight: { type: Number, required: true, min: [0, "Must be positive"] },
    neck: { type: Number, min: [0, "Must be positive"] },
    waist: { type: Number, min: [0, "Must be positive"] },
    hips: { type: Number, min: [0, "Must be positive"] },
    unit: {
      type: String,
      required: true,
      enum: ["imperial", "metric"],
      default: "imperial",
    },
    strategy: {
      type: String,
      required: true,
      enum: ["cut", "bulk"],
    },
    date: {
      type: Date,
      required: true,
      default: Date.now,
      validate: [validator.isDate, "Date is invalid"],
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  {
    timestamps: true,
    id: true,
    toJSON: {
      virtuals: true,
      versionKey: true,
    },
  }
);

const Measurement = mongoose.model(
  "measurement",
  measurementSchema,
  "measurements"
);

const addMeasurement = function (requestBody, user) {
  const measurement = new Measurement({ ...requestBody, user });
  return measurement.save();
};

module.exports = {
  Measurement,
  addMeasurement,
};
