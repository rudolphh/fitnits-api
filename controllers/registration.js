const router = require('./initRouter');

const { User, createUser } = require("../models/user");
const { createUserSettings } = require('../models/userSettings');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const accessTokenSecret = process.env.SECRET;


router.post("/register", async (req, res) => {

    let { username, email, password, passwordConfirm } = req.body;
    let { gender } = req.body;
  
    try {
        const userSettings = await createUserSettings(gender);
        const settingsId = userSettings._id.toString();
        const user = await createUser(username, email, password, passwordConfirm, settingsId);
        user.password = undefined;

        res.json({
          success: true,
          message: 'user details successfully saved',
          user
        });
    } 
    catch (error) {
      console.log(error);
      res.json({
          success: false,
          message: 'an error occurred while saving the user in database'
        });
    }
  
  });
  
  router.post("/login", async(req, res) => {
      let { username, email, password } = req.body;
  
      try {
          const user = await User.findOne({ $or: [{ username }, { email }]}, { username: 1, email: 1, password: 1 });
                        
          if(!user) {
              return res.status(200).json({ success: true, message: 'invalid username, email, or password'});
          }
  
          const passwordIsValid = bcrypt.compareSync(password, user.password);
          if(!passwordIsValid) {
              return res.status(200).json({ success: true, message: 'invalid username, email, or password'});
          }
  
          var token = jwt.sign({ id: user._id }, accessTokenSecret, {
              expiresIn: 86400 // expires in 24 hours
          });
          user.password = undefined;
          res.status(200).json({ success: true, message: 'login successful', data: user, token }); 
      } 
      catch (error) {
          res.status(500).json({ success: false, message: error.message });
      }
  });

  module.exports = router;