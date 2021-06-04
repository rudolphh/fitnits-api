const registration = require('express').Router();

const { verifyAdmin } = require('../middlewares/auth');
const { User, createUser } = require("../models/user");
const { createUserSettings } = require('../models/userSettings');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const accessTokenSecret = process.env.SECRET;


registration.post("/register", verifyAdmin, async (req, res, next) => {

    let { username, email, password, passwordConfirm, role } = req.body;
  
    try {
        if(role === "admin" && !req.isAdmin)
            return res.status(403).send({ 
                success: false, 
                message: 'Only an admin can register a new admin user' 
            });

        const userSettings = await createUserSettings(req.body);
        const settingsId = userSettings._id.toString();
        const user = await createUser(username, email, password, passwordConfirm, role, settingsId);
        user.password = undefined;

        res.json({ success: true, message: 'user details successfully saved', user });
    } 
    catch (error) {
        next(error);
    }  
});
  
registration.post("/login", async(req, res, next) => {
    let { username, email, password } = req.body;

    try {
        const user = await User.findOne({ $or: [{ username }, { email }]}, 
            { username: 1, email: 1, password: 1 });
                    
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

        let decodedToken = await jwt.verify(token, accessTokenSecret);
        let expiresIn = new Date(0);
        expiresIn.setUTCSeconds(decodedToken.exp);

        user.password = undefined;
        
        res.status(200).json({ 
            success: true, 
            message: 'login successful', 
            data: user, 
            token,
            expiresIn
        }); 
    } 
    catch (error) {
        next(error);
    }
});

module.exports = registration;