const auth = require('express').Router();
const authController = require('../controllers/auth-controller');
const { verifyAdmin } = require('../middlewares/auth-mw');

auth.post("/register", verifyAdmin, authController.register);
auth.post("/login", authController.login);

module.exports = auth;