const router = require("express").Router();

const { User } = require("../models/user");

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.use(require('./errorController'));
router.use('/', require('./registration'));
router.use('/', require('./measurements'));


router.get("/users", async (req, res) => {
  
  try {
      const data = await User.find({})
                    //.populate({ path: 'measurements', select: 'weight neck waist hips unit' })
                    .populate('settings', 'gender -_id');

      res.status(200).json({ success: true, message: 'all users', data });
  } 
  catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});













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
