const foods = require("express").Router();
const foodController = require('../controllers/food-controller');
const {
  verifyToken,
  getAuthenticatedUser,
  isAuthorized,
} = require("../middlewares/auth-mw");

foods.use(verifyToken, getAuthenticatedUser, isAuthorized);

foods
  .route("/")

  /**
   * @swagger
   * /users/{userId}/foods:
   *   get:
   *     security:
   *       - bearerAuth: []
   *     summary: Retrieve a list of foods for the given user (userId)
   *     description: Retrieve a list of foods.  Can be used to populate a list of foods when prototyping or testing an API.
   *     tags:
   *       - foods
   *     parameters:
   *     - in: path
   *       name: userId
   *       schema:
   *         type: string
   *       required: true
   *       description: Numeric ID of the user to get
   *     responses:
   *       200:
   *         description: A list of foods for the user.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success:
   *                   type: boolean
   *                 message:
   *                   type: string
   *                   example: all foods for user
   *                 data:
   *                   type: array
   *                   items:
   *                     type: object
   *                     properties:
   *                       name:
   *                         type: string
   *                         description: name of food
   *                         example: soda
   *                       calories:
   *                         type: number
   *                         description: number of calories (kCalories)
   *                         example: 150
   *                       protein:
   *                         type: number
   *                         description: amount of protein (in grams).
   *                         example: 0
   *                       carbohydrate:
   *                         type: number
   *                         description: amount of carbohydrates (in grams)
   *                         example: 38
   *                       sugars:
   *                         type: number
   *                         description: amount of protein (in grams).
   *                         example: 29
   *                       fat:
   *                         type: number
   *                         description: amount of carbohydrates (in grams)
   *                         example: 0
   *                       saturated:
   *                         type: number
   *                         description: amount of protein (in grams).
   *                         example: 0
   *                       unsaturated:
   *                         type: number
   *                         description: amount of carbohydrates (in grams)
   *                         example: 0
   *                       trans:
   *                         type: number
   *                         description: amount of protein (in grams).
   *                         example: 0
   *                       sodium:
   *                         type: number
   *                         description: amount of sodium (in milligrams)
   *                         example: 100
   *                       date:
   *                         type: date
   *                         description: The date ingested
   *                         example: 2021-05-29T08:08:40.590Z
   */
  .get(foodController.getAllFoods)

  /**
   * @swagger
   * /users/{userId}/foods:
   *   post:
   *     security:
   *       - bearerAuth: []
   *     summary: Create a new food for the given user (userId)
   *     description: Add to the list of foods for a user.  Can be used add a food to the collection when prototyping or testing an API.
   *     tags:
   *       - foods
   *     parameters:
   *     - in: path
   *       name: userId
   *       schema:
   *         type: string
   *       required: true
   *       description: Numeric ID of the user to get
   *     requestBody:
   *       required: true
   *       content:
   *         application/x-www-form-urlencoded:
   *           schema:
   *             type: object
   *             properties:
   *               name:
   *                 type: string
   *                 description: The food's name.
   *               calories:
   *                 type: number
   *                 description: The food's caloric content in calories (kCalories)
   *               date:
   *                 type: date
   *                 description: The date ingested
   *                 example: 2021-05-29
   *               protein:
   *                 type: number
   *                 description: The protein content of the food (in grams)
   *               carbohydrate:
   *                 type: number
   *                 description: The carbohydrate content (in grams).
   *               sugars:
   *                 type: number
   *                 description: The sugar content of the food (in grams)
   *               fat:
   *                 type: number
   *                 description: The fat content (in grams).
   *               saturated:
   *                 type: number
   *                 description: The saturated fat content (in grams).
   *               unsaturated:
   *                 type: number
   *                 description: The unsaturated fat content (in grams).
   *               trans:
   *                 type: number
   *                 description: The trans fat content (in grams).
   *               sodium:
   *                 type: number
   *                 description: The sodium content (in milligrams).
   *             required:
   *               - name
   *               - calories
   *               - date
   *     responses:
   *       201:
   *         description: Created food for the user.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success:
   *                   type: boolean
   *                 message:
   *                   type: string
   *                   example: all foods for user
   *                 data:
   *                   type: array
   *                   items:
   *                     type: object
   *                     properties:
   *                       name:
   *                         type: string
   *                         description: name of food
   *                         example: soda
   *                       calories:
   *                         type: number
   *                         description: number of calories (kCalories)
   *                         example: 150
   *                       protein:
   *                         type: number
   *                         description: amount of protein (in grams).
   *                         example: 0
   *                       carbohydrate:
   *                         type: number
   *                         description: amount of carbohydrates (in grams)
   *                         example: 38
   *                       sugars:
   *                         type: number
   *                         description: amount of protein (in grams).
   *                         example: 29
   *                       fat:
   *                         type: number
   *                         description: amount of carbohydrates (in grams)
   *                         example: 0
   *                       saturated:
   *                         type: number
   *                         description: amount of protein (in grams).
   *                         example: 0
   *                       unsaturated:
   *                         type: number
   *                         description: amount of carbohydrates (in grams)
   *                         example: 0
   *                       trans:
   *                         type: number
   *                         description: amount of protein (in grams).
   *                         example: 0
   *                       sodium:
   *                         type: number
   *                         description: amount of sodium (in milligrams)
   *                         example: 100
   *                       date:
   *                         type: date
   *                         description: The date ingested
   *                         example: 2021-05-29T08:08:40.590Z
   */
  .post(foodController.createFood)

  .delete(foodController.deleteManyFoods);

foods
  .route("/:foodId")
  .get(foodController.getFoodById)
  .patch(foodController.updateFoodById)
  .delete(foodController.deleteFoodById);


module.exports = foods;
