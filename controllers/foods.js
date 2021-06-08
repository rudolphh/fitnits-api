const foods = require('express').Router();

const { isNamedExportBindings } = require('typescript');
const { verifyToken, getAuthenticatedUser, isAuthorized} = require("../middlewares/auth");

const { Bites, createBites } = require('../models/foods');

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