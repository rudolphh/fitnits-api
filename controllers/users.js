const users = require('express').Router();
const measurements = require('./measurements');

const { User } = require("../models/user");
const settings = require('./settings');

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retrieve a list of fitnits users
 *     description: Retrieve a list of users from fitapi. Can be used to populate a list of users when prototyping or testing an API.
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
users.get("/", async (req, res) => {
  
    try {
        const data = await User.find({}).select('-updatedAt -__v');
                      //.populate({ path: 'measurements', select: 'weight neck waist hips unit' })
                      //.populate('settings', 'gender reminderFrequency -_id');
  
        res.status(200).json({ success: true, message: 'all users', data });
    } 
    catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
});

users.get("/:userId", async (req, res) => {

});

// nested (sub) resource
users.use('/:userId/settings', (req, res, next) => {
    req.userIdParam = req.params.userId;
    next();
}, settings);

users.use('/:userId/measurements', (req, res, next) => {
    req.userIdParam = req.params.userId;
    next();
}, measurements);

module.exports = users;