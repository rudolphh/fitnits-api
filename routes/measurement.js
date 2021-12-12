const measurements = require('express').Router();
const { verifyToken, getAuthenticatedUser, isAuthorized} = require("../middlewares/auth-mw");
const measurementController = require('../controllers/measurement-controller');

// get all user measurements and create single user measurement
measurements.route("/")
    .all(verifyToken, getAuthenticatedUser, isAuthorized)
    .get(measurementController.getAllMeasurements)
    .post(measurementController.createMeasurement);


// read, update, delete single user measurement
measurements.route('/:measurementId')
    .all(verifyToken, getAuthenticatedUser, isAuthorized)
    .get(measurementController.getMeasurement)
    .patch(measurementController.updateMeasurement)
    .delete(measurementController.deleteMeasurement);

module.exports = measurements;