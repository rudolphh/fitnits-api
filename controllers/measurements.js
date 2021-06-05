const measurements = require('express').Router();

const { verifyToken, getAuthenticatedUser, isAuthorized} = require("../middlewares/auth");

const { User } = require("../models/user");
const { Measurement, createMeasurement } = require('../models/measurement');


// get all user measurements and create single user measurement
measurements.route("/")
.all(verifyToken, getAuthenticatedUser, isAuthorized)

.get( async (req, res, next) => {
  let userId = req.userIdParam;
  
  try {
      const exists = await User.exists({ _id: userId });
      if(!exists) {
          return res.status(404).json({ success: false, message: 'user does not exist' });
      }
      const measurements = await Measurement.find({ user: userId });
      res.status(200).json({ success: true, message: 'user measurements', data: measurements });
  } 
  catch (error) {
      res.status(500).json({ success: false, message: 'error checking if user exists' });
  }

})
.post( async (req, res, next) => {
  let userId = req.userIdParam;

  try {
      const exists = await User.exists({ _id: userId });
      if(!exists) {
          return res.status(404).json({ success: false, message: 'user does not exist' });
      }

      const measurement = await createMeasurement(req.body, userId);
      res.status(200).json({ success: true, message: 'measurement successfully saved', data: measurement });
  } 
  catch (error) {
      //res.status(500).json({ success: false, message: 'error checking if user exists' });
      next(error);
  }
});


// read, update, delete single user measurement
measurements.route('/:measurementId')
.all(verifyToken, getAuthenticatedUser, isAuthorized)

.get( async (req, res) => {
    const { measurementId } = req.params;

    try {
        const measurement = await Measurement.findOne({ _id : measurementId });
        if(!measurement) 
            return res.status(404).json({ success: false, message: 'measurement not found' });

        if( measurement.user.toString() !== req.userId && req.user.role !== "admin")
            return res.status(403).json({ 
                success: false, message: 'not authorized for requested resource' 
            });

        res.status(200).json({ success: true, message: 'user measurement', data: measurement });
    } 
    catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'error finding measurement' });
    }
})

.patch( async (req, res) => {
    let { measurementId } = req.params;

    try {
        const updateQuery = { $set: req.body };
        const queryOptions = { new: true, runValidators: true };
        
        const measurement = req.user.role === "admin" ? 
            await Measurement.findOneAndUpdate({ _id : measurementId }, updateQuery, queryOptions)
            : await Measurement.findOneAndUpdate({ _id : measurementId, user: req.userId }, 
                                                                        updateQuery, queryOptions);

        if(!measurement) 
            return res.status(406).json({ success: false, message: 'unauthorized user or measurement not found' });

        res.status(200).json({ success: true, message: 'user measurement successfully updated', data: measurement });
    } 
    catch (error) {
        res.status(500).json({ success: false, message: 'error finding measurement' });
    }
})

.delete( async (req, res) => {
    let { measurementId } = req.params;

    try {
        const result = req.user.role === "admin" ? 
            await Measurement.deleteOne({ _id: measurementId })
            : await Measurement.deleteOne({ _id: measurementId, user: req.userId });

        if(!result.deletedCount) {
            return res.status(406).json({ success: false, message: 'invalid user or measurement not found' });
        }
        res.status(200).json({ success: true, message: 'user measurement successfully deleted' });
    } 
    catch (error) {
        res.status(500).json({ success: false, message: 'error finding measurement' });
    }
})

module.exports = measurements;