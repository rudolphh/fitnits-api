const router = require('./initRouter');

const { verifyToken } = require("../middlewares/auth");

const { User } = require("../models/user");
const { Measurement, createMeasurement } = require('../models/measurement');


router.route("/user/:userId/measurements")
// GET
.get( verifyToken, async (req, res, next) => {
  let { userId } = req.params;
  if( userId !== req.userId ) {
      return res.status(401).json({ success: false, message: 'invalid authentication for requested resource' });
  }

  try {
      const exists = await User.exists({ _id: userId });
      if(!exists) {
          return res.status(200).json({ success: true, message: 'user does not exist' });
      }
      const measurements = await Measurement.find({ user: userId });
      res.status(200).json({ success: true, message: 'user measurements', data: measurements });
  } 
  catch (error) {
      res.status(500).json({ success: false, message: 'error checking if user exists' });
  }

})
// POST
.post( verifyToken, async (req, res) => {
  let { userId } = req.params;
  let { weight, neck, waist, hips, unit } = req.body;

  if( userId !== req.userId ) {
    return res.status(401).json({ success: false, message: 'invalid authentication for requested resource' });
  }

  try {
      const exists = await User.exists({ _id: userId });
      if(!exists) {
          return res.status(200).json({ success: true, message: 'user does not exist' });
      }

      const measurement = await createMeasurement(weight, neck, waist, hips, unit, userId);
      res.status(200).json({ success: true, message: 'measurement successfully saved', data: measurement });
  } 
  catch (error) {
      res.status(500).json({ success: false, message: 'error checking if user exists' });
  }
});


router.route('/measurements/:measurementId')

.get( verifyToken, async (req, res) => {
    let { measurementId } = req.params;

    try {
        const measurement = await Measurement.findOne({ _id : measurementId });
        if(!measurement) {
            return res.status(200).json({ success: false, message: 'user measurement not found' });
        }

        if(req.userId !== measurement.user.toString()) {
            return res.status(401).json({ success: false, message: 'invalid authentication for requested resource' });
        }
        res.status(200).json({ success: true, message: 'user measurement', data: measurement });
    } 
    catch (error) {
        res.status(500).json({ success: false, message: 'error finding measurement' });
    }

})
.patch( verifyToken, async (req, res) => {

})

.put( verifyToken, async (req, res) => {
    let { userId } = req.params;
    let { weight, neck, waist, hips, unit } = req.body;

    try {
        const exists = await User.exists({ _id: userId });
        if(!exists) {
            return res.status(200).json({ success: true, message: 'user does not exist.' });
        }
        
        const measurement = await Measurement.find
    } 
    catch (error) {
        
    }
})

.delete( verifyToken, async (req, res) => {

})

module.exports = router;