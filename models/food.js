const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const validator = require("validator");

let FoodSchema = new Schema(
  {
    calories: { type: Number, required: true, min: [0, "Must be positive"] },
    name: {
      type: String,
      required: true,
      lowercase: true,
    },
    protein: { type: Number, min: [0, "Must be positive"] },
    carbohydrate: { type: Number, min: [0, "Must be positive"] },
    sugars: { type: Number, min: [0, "Must be positive"] },
    fat: { type: Number, min: [0, "Must be positive"] },
    saturated: { type: Number, min: [0, "Must be positive"] },
    unsaturated: { type: Number, min: [0, "Must be positive"] },
    trans: { type: Number, min: [0, "Must be positive"] },
    sodium: { type: Number, min: [0, "Must be positive"] },
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

const Food = mongoose.model("food", FoodSchema, "foods");

const addFood = function (requestBody, user) {
  const {
    id,
    calories,
    name,
    tags,
    protein,
    carbohydrate,
    sugars,
    fat,
    saturated,
    unsaturated,
    trans,
    sodium,
    date,
  } = requestBody;
  const food = new Food({
    id,
    calories,
    name,
    tags,
    protein,
    carbohydrate,
    sugars,
    fat,
    saturated,
    unsaturated,
    trans,
    sodium,
    date,
    user,
  });
  return food.save();
};

module.exports = {
  Food,
  addFood,
};
