const { Food, addFood } = require('../models/food');

const getAllFoods = async (req, res, next) => {
    res.status(200).send({ success: true, message: 'user foods', data: [] });
};

const createFood = async (req, res, next) => {};

const getFoodById = async (req, res, next) => {};
const updateFoodById = async (req, res, next) => {};
const deleteFoodById = async (req, res, next) => {};


module.exports = { 
    getAllFoods, 
    createFood,
    getFoodById,
    updateFoodById,
    deleteFoodById
};