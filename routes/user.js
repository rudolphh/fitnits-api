const users = require('express').Router();

const foods = require('./food')
const measurements = require('./measurement');
const settings = require('./setting');

const userController = require('../controllers/user-controller');

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retrieve a list of fitnits users
 *     description: Retrieve a list of users from fitapi. Can be used to populate a list of users when prototyping or testing an API.
 *     tags: 
 *       - users
 *     responses:
 *       200:
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: 
 *                   type: boolean
 *                 message: 
 *                   type: string
 *                   example: all users
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       role:
 *                         type: string
 *                         description: The user type
 *                         example: normal
 *                       _id:
 *                         type: ObjectId
 *                         description: The user ID.
 *                         example: ObjectId('60b7b8284ecd4dd9ef0e447e')
 *                       username:
 *                         type: string
 *                         description: The user's username.
 *                         example: yeshua
 *                       email:
 *                         type: string
 *                         description: The user's email
 *                         example: dlbemore.io@gmail.com
 *                       settings:
 *                         type: string
 *                         description: The user setting record ID
 *                         example: 60b1f6887ab883823b86e65e
 *                       createdAt:
 *                         type: date
 *                         description: The user's creation date
 *                         example: 2021-05-29T08:08:40.590Z
 *                       id:
 *                         type: string
 *                         description: The user ID in string form.
 *                         example: 60b7b8284ecd4dd9ef0e447e
*/
users.get("/", userController.getAllUsers);

users.get("/:userId", async (req, res) => {
    res.send('muahahaha. stop');
});

const userIdParam = require('../middlewares/user-id-param');

// nested (sub) resource.  
// these user routes will defer handling to router given as last argument
// with the userIdParam middleware providing req.params.userId in req.userIdParam
users.use('/:userId/foods', userIdParam, foods);
users.use('/:userId/measurements', userIdParam, measurements);
users.use('/:userId/settings', userIdParam, settings);

module.exports = users;