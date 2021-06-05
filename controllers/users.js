const users = require('express').Router();
const measurements = require('./measurements');

const { User } = require("../models/user");
const settings = require('./settings');


users.get("/", async (req, res) => {
  
    try {
        const data = await User.find({})
                      //.populate({ path: 'measurements', select: 'weight neck waist hips unit' })
                      .populate('settings', 'gender reminderFrequency -_id');
  
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