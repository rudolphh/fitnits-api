const dotenv = require('dotenv').config();
const express = require("express");
const router = express.Router();
const cors = require("cors");

const { verifyToken, getAuthenticatedUser } = require("../middlewares/auth");

const { User, createUser } = require("../models/user");
const { UserSettings, createUserSettings } = require('../models/userSettings');
const { Measurement, createMeasurement } = require('../models/measurement');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const accessTokenSecret = process.env.SECRET;


router.use(cors());
router.use(express.urlencoded({ extended: true }));
router.use(express.json());


router.post("/register", async (req, res) => {

  let { username, email, password, passwordConfirm } = req.body;
  let { gender } = req.body;

  try {
      const userSettings = await createUserSettings(gender);
      const settingsId = userSettings._id.toString();
      const user = await createUser(username, email, password, passwordConfirm, settingsId);

      res.json({
        success: true,
        message: 'user details successfully saved.',
        user
      });
  } 
  catch (error) {
    console.log(error);
    res.json({
        success: false,
        message: 'an error occurred while saving the user in database.'
      });
  }

});

router.post("/login", async(req, res) => {
    let { username, email, password } = req.body;

    try {
        const user = await User.findOne({ $or: [{ username }, { email }]})
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
        res.status(200).json({ 
            success: true, 
            message: 'login successful', 
            data: user,
            token
            }); 
    } 
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
})



router.get("/users", async (req, res) => {
  
  try {
      const data = await User.find({}, { password: 0 })
                    //.populate({ path: 'measurements', select: 'weight neck waist hips unit' })
                    .populate('settings', 'gender -_id');

      res.status(200).json({ success: true, message: 'all users', data });
  } 
  catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});


router.route("/measurements/:userId")

  .get( verifyToken, getAuthenticatedUser, async (req, res, next) => {
    let { userId } = req.params;

    try {
        const exists = await User.exists({ _id: userId });
        if(exists) {
            const measurements = await Measurement.find({ user: userId });
            res.status(200).json({
                success: true,
                message: 'measurements',
                data: measurements
              });
        } else {
            res.status(200).json({
                success: true,
                message: 'user does not exist.',
              });
        }
    } 
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'an error occurred while checking if the user exists in database.'
          });
    }

  })

  //.post(authenticateJWT, getAuthenticatedUser, (req, res) => {
  .post( async (req, res) => {
    let { userId } = req.params;
    let { weight, neck, waist, hips, unit } = req.body;

    try {
        const exists = await User.exists({ _id: userId });

        if(exists) {
            const measurement = await createMeasurement(weight, neck, waist, hips, unit, userId);
            res.status(200).json({
                success: true,
                message: 'user measurement successfully saved.',
                data: measurement
              });
        } else {
            res.status(200).json({
                success: true,
                message: 'user does not exist.',
              });
        }
    } 
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'an error occurred while checking if the user exists in database.'
        });
    }
  });// end post










// contact form
router.post("/contact", (req, res) => {
  let data = req.body;

  // add ip address to data
  data.ip = requestIp.getClientIp(req);
  console.log(data);

  // if a spam bot filled out the hidden dummy input
  if (data.url !== "") {
    return spammerRequest.create(data, (err, data) => {
      if (err) {
        console.log(err);
        return res.status(500).send("There was a problem registering user");
      }
      delete data.ip;
      return res.json(data);
    });
  }

  ContactRequest.create(data, (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).send("There was a problem registering user");
    }
    console.log(`Inserted ... ${data} `);

    //send email
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    // prepare user email (text and html versions)
    text = `Hey ${data.firstname} ${data.lastname}, \n\n`;
    text += `I received your message and will respond shortly. \n\n`;
    text += "Thanks, \n";
    text += "Rudy A. Hernandez";

    body = `<p>Hey ${data.firstname} ${data.lastname},</p>`;
    body += `<p>I received your message and will respond shortly.</p>`;
    body += "Thanks,<br>";
    body += "Rudy A. Hernandez";

    // send user email
    const userMsg = {
      to: data.email, // Change to your recipient
      // Change to your verified sender
      from: {
        email: "ru@rudyah.com",
        name: "Rudy A. Hernandez",
      },
      replyTo: "rudolpharthur@gmail.com",
      subject: "Message Received",
      text: text,
      html: body,
    };
    sgMail
      .send(userMsg)
      .then(() => {
        console.log("Email sent");
        delete data.ip;
        console.log(data);
        res.json(data);
      })
      .catch((error) => {
        console.error(error);
        res.send("Oops, look the other way.");
      });

    // send admin an email
    let adminMsg = {
      to: "rudolpharthur@gmail.com",
      from: {
        email: "ru@rudyah.com",
        name: `${data.firstname} ${data.lastname}`,
      },
      replyTo: `${data.email}`,
      subject: `${data.need}`,
      text: `From : ${data.firstname} ${data.lastname} \nEmail: ${data.email}\n${data.message}`,
      html: `<Email:>From : ${data.firstname} ${data.lastname}<br>Email: ${data.email}</p><p>${data.message}</p>`,
    };

    sgMail
      .send(adminMsg)
      .then(() => {
        console.log("Admin email sent");
      })
      .catch((error) => {
        console.error(error);
      });
  });
});

module.exports = router;
