const { Food, addFood } = require("../models/food");

const getAllFoods = async (req, res, next) => {
  let userId = req.userIdParam;
  const { start, end, name } = req.query;

  try {
    let query;

    name ? query = { name: { $regex: `/^${name}/i` } } :
    start
      ? end
        ? (query = { user: userId, date: { $gte: start, $lt: end } })
        : (query = { user: userId, date: { $gte: start } })
      : (query = { user: userId });

    const foods = await Food.find(query).sort({ date: "desc" });

    res.status(200).json({
      success: true,
      message: "user foods",
      data: foods,
    });
  } catch (error) {
    next(error);
  }
};

const createFood = async (req, res, next) => {
  let userId = req.userIdParam;

  try {
    const food = await addFood(req.body, userId);
    res.status(200).json({
      success: true,
      message: "food successfully saved",
      data: food,
    });
  } catch (error) {
    next(error);
  }
};

const getFoodById = async (req, res, next) => {
  const { foodId } = req.params;

  try {
    const food = await Food.findOne({ _id: foodId });
    if (!food)
      return res
        .status(404)
        .json({ success: false, message: "food not found" });

    if (food.user.toString() !== req.userId && req.user.role !== "admin")
      return res.status(403).json({
        success: false,
        message: "not authorized for requested resource",
      });

    res.status(200).json({ success: true, message: "user food", data: food });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "error finding food" });
  }
};

const updateFoodById = async (req, res, next) => {
  let { foodId } = req.params;

  try {
    const updateQuery = { $set: req.body };
    const queryOptions = { new: true, runValidators: true };

    const food =
      req.user.role === "admin"
        ? await Food.findOneAndUpdate(
            { _id: foodId },
            updateQuery,
            queryOptions
          )
        : await Food.findOneAndUpdate(
            { _id: foodId, user: req.userId },
            updateQuery,
            queryOptions
          );

    if (!food)
      return res.status(406).json({
        success: false,
        message: "invalid user or food not found",
      });

    res.status(200).json({
      success: true,
      message: "user food successfully updated",
      data: food,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "error finding food" });
  }
};

const deleteFoodById = async (req, res, next) => {
  let { foodId } = req.params;

  try {
    const result =
      req.user.role === "admin"
        ? await Food.deleteOne({ _id: foodId })
        : await Food.deleteOne({ _id: foodId, user: req.userId });

    if (!result.deletedCount) {
      return res.status(406).json({
        success: false,
        message: "invalid user or food not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "user food successfully deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "error finding food",
    });
  }
};

module.exports = {
  getAllFoods,
  createFood,
  getFoodById,
  updateFoodById,
  deleteFoodById,
};
