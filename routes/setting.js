const settings = require('express').Router();
const { verifyToken, getAuthenticatedUser, isAuthorized} = require("../middlewares/auth-mw");
const settingsController = require('../controllers/setting-controller');

settings.route('/')
.all(verifyToken, getAuthenticatedUser, isAuthorized)
.get(settingsController.getSettings)
.patch(settingsController.updateSettings);


module.exports = settings;