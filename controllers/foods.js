const foods = require('express').Router();
const { verifyToken, getAuthenticatedUser, isAuthorized} = require("../middlewares/auth");
const { Food, createFood } = require('../models/food');


foods.route('/')
.all(verifyToken, getAuthenticatedUser, isAuthorized)

/**
 * @swagger
 * /users/{userId}/foods:
 *   get:
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
 *                         description: number of calories
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
 *                         example: 0
 *                       fat:
 *                         type: number
 *                         description: amount of carbohydrates (in grams)
 *                         example: 38
 *                       saturated:
 *                         type: number
 *                         description: amount of protein (in grams).
 *                         example: 0
 *                       unsaturated:
 *                         type: number
 *                         description: amount of carbohydrates (in grams)
 *                         example: 38
 *                       trans:
 *                         type: number
 *                         description: amount of protein (in grams).
 *                         example: 0
 *                       sodium:
 *                         type: number
 *                         description: amount of carbohydrates (in grams)
 *                         example: 38
 *                       date:
 *                         type: date
 *                         description: The date ingested 
 *                         example: 2021-05-29T08:08:40.590Z
*/
.get( async (req, res, next) => {
    res.status(200).send({ success: true, message: 'user foods', data: [] });
})
.post( async (req, res, next) => {

})
.patch( async (req, res, next) => {

})
.delete( async (req, res, next) => {

})

module.exports = foods;