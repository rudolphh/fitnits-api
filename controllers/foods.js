const foods = require('express').Router();
const { verifyToken, getAuthenticatedUser, isAuthorized} = require("../middlewares/auth");
const { Food, createFood } = require('../models/foods');


foods.route('/')
.all(verifyToken, getAuthenticatedUser, isAuthorized)

.get( async (req, res, next) => {

})
.post( async (req, res, next) => {

})
.patch( async (req, res, next) => {

})
.delete( async (req, res, next) => {

})