const settings = require('express').Router();

const { verifyToken, getAuthenticatedUser, isAuthorized} = require("../middlewares/auth");

const { User } = require("../models/user");
const { UserSettings } = require('../models/userSettings');

settings.route('/')
.all(verifyToken, getAuthenticatedUser, isAuthorized)
.get( async (req, res, next) => {
    let userIdParam = req.userIdParam;

    try {
        let user = undefined;
        // if the requested user in an admin we need to get the user
        if(userIdParam !== req.userId) {
            user = await User.findOne({ _id: userIdParam });
            if(!user)
                return res.status(404).send({ success: false, message: 'user not found' });
        } else {
            user = req.user;
        }
        const userSettings = await UserSettings.findOne({ _id: user.settings });
        res.status(200).send({ success: true, message: 'user settings', userSettings });
    } 
    catch (error) {
        next(error);
    }
})
.patch( async (req, res, next) => {
    let userIdParam = req.userIdParam;

    try {
        // if the requested user in an admin we need to get the user
        if(userIdParam !== req.userId) {
            user = await User.findOne({ _id: userIdParam });
            if(!user)
                return res.status(404).send({ success: false, message: 'user not found' });
        } else {
            user = req.user;
        }
        
        const userSettings = await UserSettings.findOneAndUpdate({ _id: user.settings }, 
            { $set: req.body }, { new: true, runValidators: true });

        res.status(200).send({ success: true, message: 'user settings', userSettings });
    } 
    catch (error) {
        next(error);
    }
});


module.exports = settings;