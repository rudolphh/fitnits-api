const dotenv = require('dotenv').config();
const express = require("express");
const router = express.Router();
const cors = require("cors");

router.use(cors());
router.use(express.urlencoded({ extended: true }));
router.use(express.json());

module.exports = router;