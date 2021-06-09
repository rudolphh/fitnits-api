const dotenv = require('dotenv').config();
const express = require("express");
const router = express.Router();
const cors = require("cors");

router.use(cors());
router.use(express.urlencoded({ extended: true }));
router.use(express.json());

// resource controllers
const registration = require('./registration');
const users = require('./users');

router.use('/users', users);
router.use(registration);


router.get('/', (req, res) => {
    res.status(200).send({ success: true, message: 'hello world' });
});


// error handling
const errorController = require('./errorController');
router.use(errorController);

// when all middleware/routes exhausted - 404
router.use(function (req, res, next) {
    res.status(404).json({ success: false, message: '404 Not Found'})
})

module.exports = router;