const { User } = require('../models/user');

const getAllUsers = async (req, res) => {
  
    try {
        const data = await User.find({}).select('-updatedAt -__v');
                      //.populate({ path: 'measurements', select: 'weight neck waist hips unit' })
                      //.populate('settings', 'gender reminderFrequency -_id');
  
        res.status(200).json({ success: true, message: 'all users', data });
    } 
    catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
}

module.exports = { getAllUsers }